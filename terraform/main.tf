provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "my_subnet" {
  count                   = 2
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.${count.index}.0/24"
  availability_zone       = element(data.aws_availability_zones.available.names, count.index)
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_route_table" "my_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }
}

resource "aws_route_table_association" "my_route_table_assoc" {
  count          = 2 # Associate both subnets with the route table
  subnet_id      = aws_subnet.my_subnet[count.index].id
  route_table_id = aws_route_table.my_route_table.id
}

resource "aws_security_group" "alb_sg" {
  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic from anywhere (adjust as needed)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # All outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "my_alb" {
  name               = "my-alb"
  internal           = false # Internet-facing
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.my_subnet[*].id # Use both subnets
}

resource "aws_lb_target_group" "my_target_group" {
  name     = "my-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.my_vpc.id

  health_check {
    interval          = 30
    timeout           = 5
    healthy_threshold = 2
    matcher           = "200"
    path              = "/"
    port              = "3000"
    protocol          = "HTTP"
  }
}

resource "aws_security_group" "instance_sg" {
  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id] # Allow traffic from the ALB's security group
  }

  ingress {
    protocol         = "tcp"
    from_port        = 22
    to_port          = 22
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # All outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "vm1" {
  ami              = data.aws_ami.ubuntu.id
  instance_type    = "t3.micro" # t2.micro | t2.small | t2.medium
  key_name         = aws_key_pair.key_pair1.key_name
  subnet_id        = aws_subnet.my_subnet[0].id          # Place the instance in the first subnet
  security_groups  = [aws_security_group.instance_sg.id] # Use the new security group
  user_data_base64 = local.is_cloudinit_config_enabled ? data.template_cloudinit_config.config[0].rendered : null
  tags             = local.tags
}


resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.my_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.my_target_group.arn
  }
}

resource "aws_lb_target_group_attachment" "my_target" {
  target_group_arn = aws_lb_target_group.my_target_group.arn
  target_id        = aws_instance.vm1.id
  port             = 3000
}

resource "aws_key_pair" "key_pair1" {
  key_name   = "id_rsa"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDH/O28bMkocODoyURVkwdkLHcC+Bmoz+Lq4kwel7PwBcJTIVz7NdgaHRy/RxHxz2/3XChPjPuLSMb+bziZgp5f6WMPl6V8L0swiHQo3WcjjIyBB0qKTUEjVJQkfQvSJQsWO2JD2r+NFlueEITPNaIat6CZqVOMnJwN4GI63X/xZWC5WGno5V9HiPU6GilYOZMcVNStz1SQbF2PYor8ItIa+Z/K2jiyEkxuyBkzKcxylxRgniC8BotIKaYdy5Jt+BOWQzdE+70mCP5i5nNLwhqquMsdeFs3dNdDU5HQWrjvfhXs6Ygv739CGokykCQa93o4Fa8bUKk6Q/wXS+Z8Rfkfm7NylDOnuokDD4sTAuuPq2D9HtFChuAsuBDj4hjKhTH1cTL/BMOR1KiFT2kazku5TRQYqZFKI2Y1l8SgNWhw+H62jdKtSdraZJt7us2w20CldhMhzk8JH63LLwyJdvD+EG1Rn2QSdAMx38FGWQEFeASaggh2foUm5m3LDyyhMmM= liangfuski@liangfuski-ThinkPad-T490"
}

output "instance_ips" {
  value = aws_instance.vm1.public_ip
}
