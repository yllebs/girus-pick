terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure AWS provider
provider "aws" {
  region = "us-east-1"
  
  # As credenciais são fornecidas por variáveis de ambiente
  # AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY
  
  # Necessário apenas para o ambiente de laboratório
  # Em um ambiente real da AWS, isso não seria necessário
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  
  # Solução para o problema do S3 no ambiente de laboratório
  s3_use_path_style = true
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
    Environment = "development"
  }
}

# Create a subnet
resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "main-subnet"
    Environment = "development"
  }
}

# Create an EC2 instance
resource "aws_instance" "example" {
  ami           = "ami-12345678"  # Em um ambiente real, você usaria um AMI válido
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.main.id
  
  tags = {
    Name = "example-instance"
    Environment = "development"
  }
}

# Create an S3 bucket
resource "aws_s3_bucket" "example" {
  bucket = "my-test-bucket"
  
  tags = {
    Name = "example-bucket"
    Environment = "development"
  }
}

# Output values
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.example.id
}

output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.example.bucket
} 