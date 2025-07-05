terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure AWS provider to use LocalStack
provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  # Use LocalStack endpoint
  endpoints {
    lambda         = "http://localhost:4566"
    iam            = "http://localhost:4566"
    cloudwatch     = "http://localhost:4566"
  }
}

# Create an IAM role for the Lambda function
resource "aws_iam_role" "lambda_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach the Lambda basic execution policy to the IAM role
resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Create the Lambda function
resource "aws_lambda_function" "example_lambda" {
  function_name = "example_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  # Inline Lambda function code
  filename      = "${path.module}/lambda_function.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda_function.zip")

  environment {
    variables = {
      EXAMPLE_VAR = "Hello from LocalStack"
    }
  }
}

# Create a CloudWatch Log Group for the Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name = "/aws/lambda/${aws_lambda_function.example_lambda.function_name}"
  retention_in_days = 7
}

# Output the Lambda function ARN
output "lambda_arn" {
  description = "The ARN of the Lambda function"
  value       = aws_lambda_function.example_lambda.arn
}

# Output instructions
output "invoke_command" {
  description = "Command to invoke the Lambda function"
  value       = "aws --endpoint-url=http://localhost:4566 lambda invoke --function-name example_lambda output.json"
} 