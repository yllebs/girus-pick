#!/bin/bash

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Create zip file for Lambda function
echo "Creating Lambda function zip file..."
zip -j lambda_function.zip index.js

echo "Lambda function package created: lambda_function.zip"
echo "You can now run 'terraform init' and 'terraform apply'" 