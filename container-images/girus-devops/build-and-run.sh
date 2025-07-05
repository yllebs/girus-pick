#!/bin/bash

# Script para construir e executar o container de treinamento DevOps

# Definição de cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções utilitárias
print_section() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

print_warning() {
    echo -e "${YELLOW}! $1${NC}"
}

# Verificar se o Docker está instalado
print_section "Verificando ambiente"
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
fi
print_success "Docker encontrado"

# Construir a imagem
print_section "Construindo imagem DevOps Training"
docker build -t devops-training:latest . || print_error "Falha ao construir a imagem"
print_success "Imagem construída com sucesso"

# Verificar se já existe um container com o mesmo nome
if docker ps -a --format '{{.Names}}' | grep -q "^devops-training$"; then
    print_warning "Container 'devops-training' já existe. Removendo..."
    docker rm -f devops-training >/dev/null 2>&1
fi

print_section "Configuração do container"
print_warning "Este container será executado em modo privilegiado para suportar Docker-in-Docker."
print_warning "Após iniciar o container, execute o comando 'inicia-docker' para iniciar o daemon Docker."

# Perguntar se deseja criar um volume para workspace
read -p "Deseja criar um volume para workspace? (s/n): " create_workspace
WORKSPACE_VOLUME=""
if [[ "$create_workspace" =~ ^[Ss]$ ]]; then
    mkdir -p workspace
    WORKSPACE_VOLUME="-v $(pwd)/workspace:/home/estudante/workspace"
    print_success "Volume workspace criado"
fi

# Perguntar se deseja montar o kubeconfig
read -p "Deseja montar seu kubeconfig no container? (s/n): " mount_kubeconfig
KUBECONFIG_VOLUME=""
if [[ "$mount_kubeconfig" =~ ^[Ss]$ ]]; then
    if [ -f ~/.kube/config ]; then
        KUBECONFIG_VOLUME="-v ~/.kube/config:/home/estudante/.kube/config"
        print_success "Kubeconfig será montado"
    else
        print_warning "Arquivo ~/.kube/config não encontrado. Kubeconfig não será montado."
    fi
fi

# Executar o container
print_section "Executando container"
docker run --privileged -it --name devops-training \
    $WORKSPACE_VOLUME \
    $KUBECONFIG_VOLUME \
    devops-training:latest

print_section "Container encerrado"
echo "Para iniciar novamente, use: docker start -ai devops-training" 