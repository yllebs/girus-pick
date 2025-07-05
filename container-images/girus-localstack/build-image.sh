#!/bin/bash

# Script para construir a imagem Docker do LocalStack

set -e  # Sair imediatamente se ocorrer algum erro

echo "=== Iniciando build da imagem linuxtips/girus-localstack:0.1 ==="

# Garantir que estamos no diretório correto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
cd "$SCRIPT_DIR"

# Listar os arquivos no diretório atual para debug
echo "Arquivos no diretório atual:"
ls -la

# Verificar se o entrypoint.sh existe
if [ ! -f "entrypoint.sh" ]; then
  echo "ERRO: O arquivo entrypoint.sh não existe no diretório atual."
  exit 1
fi

# Verificar se o diretório terraform existe
if [ ! -d "terraform" ]; then
  echo "ERRO: O diretório terraform não existe no diretório atual."
  exit 1
fi

# Verificar permissões do entrypoint.sh
chmod +x entrypoint.sh
echo "Permissões de execução adicionadas ao entrypoint.sh"

# Usar o diretório atual como contexto do Docker
echo "Construindo a imagem Docker..."
docker build -t linuxtips/girus-localstack:0.1 -f Dockerfile.localstack-lab .

# Verificar se a build foi bem-sucedida
if [ $? -eq 0 ]; then
  echo "=== Imagem construída com sucesso! ==="
  echo "Nome da imagem: linuxtips/girus-localstack:0.1"
  
  # Opcionalmente, testar a imagem para garantir que o entrypoint.sh está funcionando
  echo "=== Testando a imagem ==="
  docker run --rm --entrypoint ls linuxtips/girus-localstack:0.1 -la /entrypoint.sh /terraform
  
  echo "=== Verificando configuração do entrypoint.sh ==="
  docker run --rm --entrypoint cat linuxtips/girus-localstack:0.1 /entrypoint.sh | head -5
  
  echo ""
  echo "Para testar a imagem manualmente, execute:"
  echo "docker run --rm -it -p 4566:4566 linuxtips/girus-localstack:0.1"
else
  echo "ERRO: Falha ao construir a imagem."
  exit 1
fi 