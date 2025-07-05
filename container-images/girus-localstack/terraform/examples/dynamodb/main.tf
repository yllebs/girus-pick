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
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
}

# Create a DynamoDB table
resource "aws_dynamodb_table" "example_table" {
  name           = "example-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "title"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "N"
  }

  global_secondary_index {
    name               = "TitleIndex"
    hash_key           = "title"
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "CreatedAtIndex"
    hash_key           = "created_at"
    projection_type    = "ALL"
  }

  tags = {
    Name        = "example-dynamodb-table"
    Environment = "development"
  }
}

# Output values
output "table_name" {
  description = "Name of the DynamoDB table"
  value       = aws_dynamodb_table.example_table.name
}

output "table_arn" {
  description = "ARN of the DynamoDB table"
  value       = aws_dynamodb_table.example_table.arn
}

# Output a sample command to add an item to the table
output "put_item_command" {
  description = "Command to add an item to the DynamoDB table"
  value       = <<EOF
aws dynamodb put-item \
  --table-name example-table \
  --item '{"id": {"S": "1"}, "title": {"S": "Example Item"}, "created_at": {"N": "1617234000"}}' \
  --return-consumed-capacity TOTAL
EOF
}

# Output a sample query command
output "query_command" {
  description = "Command to query the DynamoDB table"
  value       = "aws dynamodb scan --table-name example-table"
} 