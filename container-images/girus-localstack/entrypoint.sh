#!/bin/bash
set -e

echo "Starting LocalStack in background..."
# Inicia o LocalStack em background e captura o PID
nohup /usr/local/bin/docker-entrypoint.sh > /var/log/localstack.log 2>&1 &
LOCALSTACK_PID=$!

echo "Waiting for LocalStack to be ready..."
timeout 120 bash -c "until curl -s http://localhost:4566/health > /dev/null; do sleep 2; done" || true
# Não falhar se o timeout ocorrer

echo "LocalStack is running!"

# Configurar o AWS CLI para usar LocalStack por padrão
echo "Configurando AWS CLI para usar o LocalStack por padrão..."
mkdir -p /root/.aws
cat > /root/.aws/config << EOF
[default]
region = us-east-1
output = json
EOF

cat > /root/.aws/credentials << EOF
[default]
aws_access_key_id = test
aws_secret_access_key = test
EOF

# Criar arquivo de configuração bash para o AWS CLI
cat > /root/.aws_aliases << EOF
# Configurações para AWS CLI e Terraform
export AWS_ENDPOINT_URL=http://localhost:4566
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

# Função auxiliar para simplificar comandos AWS
aws() {
  command aws --endpoint-url=http://localhost:4566 "\$@"
}

# Função auxiliares para serviços específicos AWS (sem mostrar --endpoint-url)
aws-s3() {
  command aws --endpoint-url=http://localhost:4566 s3 "\$@"
}

aws-ec2() {
  command aws --endpoint-url=http://localhost:4566 ec2 "\$@"
}

aws-dynamodb() {
  command aws --endpoint-url=http://localhost:4566 dynamodb "\$@"
}

aws-lambda() {
  command aws --endpoint-url=http://localhost:4566 lambda "\$@"
}

aws-iam() {
  command aws --endpoint-url=http://localhost:4566 iam "\$@"
}

aws-sqs() {
  command aws --endpoint-url=http://localhost:4566 sqs "\$@"
}
EOF

# Adicionar source para o arquivo de aliases no .bashrc
grep -q ".aws_aliases" /root/.bashrc || echo "source /root/.aws_aliases" >> /root/.bashrc

# Carregar as configurações no ambiente atual
source /root/.aws_aliases || true

# Configurar o AWS_ENDPOINT_URL para aplicações
export AWS_ENDPOINT_URL=http://localhost:4566

# Adicionar variáveis de ambiente específicas para o Terraform
# Isso permite que o Terraform use o LocalStack sem configuração explícita de endpoints
export TF_VAR_region=us-east-1
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1

# Variáveis de ambiente específicas para os serviços AWS individuais
export AWS_EC2_ENDPOINT=http://localhost:4566
export AWS_S3_ENDPOINT=http://localhost:4566
export AWS_IAM_ENDPOINT=http://localhost:4566
export AWS_DYNAMODB_ENDPOINT=http://localhost:4566
export AWS_LAMBDA_ENDPOINT=http://localhost:4566
export AWS_APIGATEWAY_ENDPOINT=http://localhost:4566
export AWS_CLOUDFORMATION_ENDPOINT=http://localhost:4566
export AWS_CLOUDWATCH_ENDPOINT=http://localhost:4566
export AWS_SQS_ENDPOINT=http://localhost:4566
export AWS_SNS_ENDPOINT=http://localhost:4566
export AWS_RDS_ENDPOINT=http://localhost:4566

echo ""
echo "Terraform is configured to use LocalStack"
echo "AWS CLI is configured to use LocalStack"
echo ""
echo "===== LocalStack Environment ====="
echo "AWS serviços disponíveis em: http://localhost:4566"
echo "AWS credenciais: test / test"
echo "Região: us-east-1"
echo ""
echo "Utilize os comandos AWS CLI:"
echo "  aws s3 ls"
echo "  aws ec2 describe-instances"
echo "  aws-s3 ls"
echo "============================="
echo ""

# Registrar trap para SIGTERM - garantir que finaliza corretamente
trap 'kill $LOCALSTACK_PID 2>/dev/null || true; echo "Container está sendo encerrado..."; exit 0' TERM INT

# Comandos específicos se forem solicitados
if [ "$1" != "" ] && [ "$1" != "bash" ] && [ "$1" != "sh" ]; then
  # Executar comando específico
  echo "Executando comando: $@"
  exec "$@"
  # Caso o comando termine, vamos garantir que o container continue vivo
  echo "Comando finalizado. Mantendo container vivo..."
fi

# Se chegou aqui, precisamos manter o container vivo
if [ -t 0 ]; then
  # Terminal interativo detectado - exibir mensagem e então manter vivo
  echo "Terminal interativo detectado."
  echo "Iniciando shell..."
  bash --login
  echo "Shell encerrado. Mantendo container vivo..."
else
  # Sem terminal interativo - apenas informar
  echo "Container iniciado em modo não interativo."
  echo "LocalStack PID: $LOCALSTACK_PID"
fi

# IMPORTANTE: Esta linha DEVE ser a última do script
# Mantenha o container vivo indefinidamente
echo "Container permanecerá em execução. Use 'docker stop' para encerrá-lo."
exec tail -f /dev/null 