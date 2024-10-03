variable "access_key" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "linux_package_list" {
  type        = list(string)
  description = "List of linux package to be installed in the VM, Example: git, docker.io, docker-compose."
}

variable "github_repository_owner" {
  type = string
}

variable "github_container_registry_token" {
  type = string
}

variable "instance_user" {
  type = string
}


