locals {
  is_cloudinit_config_enabled = (
    (length(var.linux_package_list) > 0)
  )
}

locals {
  tags = {
    LastModification = formatdate("YYYY-MM-DD", timestamp())
    Owner            = "AWS Terraform Automation"
    Purpose          = "New Created VM to deploy new app"
    Environment      = "Production"
    Name             = "Quizhub Web App"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "aws_availability_zones" "available" {}

data "template_cloudinit_config" "config" {

  count = local.is_cloudinit_config_enabled ? 1 : 0

  # This install a list of linux packages. 
  dynamic "part" {
    for_each = length(var.linux_package_list) > 0 ? [1] : []
    content {
      filename     = "linux_package_list.yml"
      content_type = "text/cloud-config"
      content = templatefile("${path.module}/files/linux_package_list.yml", {
        packages = var.linux_package_list
      })
    }
  }

  # 1. adds the user to the docker group so that the user can call docker without sudo 
  # 2. log into ghcr
  dynamic "part" {
    for_each = [1] # We always want to run this.
    content {
      filename     = "docker_group.sh"
      content_type = "text/x-shellscript"
      content      = <<-EOT
        #!/bin/bash
        # Add the current user to the docker group
        usermod -aG docker ${var.instance_user}

        # Restart Docker service to apply the group changes
        systemctl restart docker
        su - ${var.instance_user} -c "docker login ghcr.io -u ${var.github_repository_owner} -p ${var.github_container_registry_token}"
      EOT
    }
  }
}
