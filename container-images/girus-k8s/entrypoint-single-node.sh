#!/bin/bash
set -e

# Configura o DinD (Docker in Docker)
echo "Iniciando Docker daemon..."
dockerd-entrypoint.sh &
sleep 5

# Espera Docker estar pronto
echo "Aguardando Docker estar pronto..."
until docker info &>/dev/null; do
  echo "Esperando Docker iniciar..."
  sleep 1
done
echo "Docker está pronto!"

# Configuração do Kind
echo "Criando configuração Kind para Kubernetes 1.29..."
cat > /kind-config.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  image: kindest/node:v1.29.2@sha256:51a1434a5397193442f0be2a297b488b6c919ce8a3931be0ce822606ea5ca245
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 6443
    hostPort: 6443
    protocol: TCP
EOF

# Cria um cluster Kind
echo "Iniciando cluster Kubernetes single-node com Kind..."
kind create cluster --config=/kind-config.yaml --name single-node

echo "Verificando o estado do cluster..."
kubectl cluster-info
kubectl get nodes -o wide

echo "Aguardando o nó ficar pronto..."
# Aguarda até que o nó esteja pronto (máximo de 60 segundos)
timeout=60
counter=0
while [ $counter -lt $timeout ]; do
    NODE_STATUS=$(kubectl get nodes -o jsonpath='{.items[0].status.conditions[?(@.type=="Ready")].status}')
    if [ "$NODE_STATUS" == "True" ]; then
        echo "Nó está pronto!"
        break
    fi
    echo "Aguardando nó ficar pronto... ($counter/$timeout)"
    sleep 5
    counter=$((counter+5))
done

if [ $counter -ge $timeout ]; then
    echo "Aviso: Tempo limite excedido aguardando o nó ficar pronto, mas o cluster ainda pode ser usado."
fi

echo "Kubernetes cluster single-node está pronto!"
echo "Versão do Kubernetes:"
kubectl version

# Configurando permissões RBAC para o namespace lab-test-user
echo "Configurando namespace lab-test-user com permissões privilegiadas..."
kubectl create namespace lab-test-user || echo "Namespace já existe"

# Configuração RBAC para dar permissões de administrador
echo "Aplicando configuração RBAC para o namespace lab-test-user..."
cat > /tmp/rbac.yaml <<EOF
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: lab-test-user
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: lab-test-user-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: lab-test-user
- kind: ServiceAccount
  name: default
  namespace: lab-test-user
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF

kubectl apply -f /tmp/rbac.yaml
echo "Configuração RBAC aplicada com sucesso!"

# Verificar permissões 
echo "Verificando permissões do ServiceAccount..."
kubectl --as=system:serviceaccount:lab-test-user:default get nodes || echo "Ainda há problemas de permissão"

echo "Cluster totalmente configurado e pronto para uso!"

# Mantem o processo rodando
echo "Cluster em execução. Use Ctrl+C para parar."
tail -f /dev/null