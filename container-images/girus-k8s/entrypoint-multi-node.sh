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

# Configuração do Kind para três nós
echo "Criando configuração Kind para Kubernetes 1.29 com três nós..."
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
- role: worker
  image: kindest/node:v1.29.2@sha256:51a1434a5397193442f0be2a297b488b6c919ce8a3931be0ce822606ea5ca245
- role: worker
  image: kindest/node:v1.29.2@sha256:51a1434a5397193442f0be2a297b488b6c919ce8a3931be0ce822606ea5ca245
EOF

# Cria um cluster Kind
echo "Iniciando cluster Kubernetes com três nós usando Kind..."
kind create cluster --config=/kind-config.yaml --name triple-node

echo "Verificando o estado do cluster..."
kubectl cluster-info
kubectl get nodes -o wide

echo "Aguardando os nós ficarem prontos..."
# Aguarda até que os nós estejam prontos (máximo de 180 segundos)
timeout=180
counter=0
while [ $counter -lt $timeout ]; do
    READY_NODES=$(kubectl get nodes --no-headers | grep " Ready " | wc -l)
    TOTAL_NODES=$(kubectl get nodes --no-headers | wc -l)
    
    echo "Nós prontos: $READY_NODES/$TOTAL_NODES ($counter/$timeout)"
    
    if [ "$READY_NODES" == "$TOTAL_NODES" ]; then
        echo "Todos os nós estão prontos!"
        break
    fi
    
    sleep 5
    counter=$((counter+5))
done

if [ $counter -ge $timeout ]; then
    echo "Aviso: Tempo limite excedido aguardando os nós ficarem prontos, mas o cluster ainda pode ser usado."
fi

echo "Kubernetes cluster com três nós está pronto!"
echo "Versão do Kubernetes:"
kubectl version

# Exibe informações detalhadas dos nós
echo "Informações dos nós:"
kubectl get nodes -o wide

# Instala o metrics-server para facilitar o monitoramento
echo "Instalando metrics-server..."
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl patch deployment metrics-server -n kube-system --type=json -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'

# Instala o istio
echo "Instalando istio..."
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.3.0/standard-install.yaml

# Adiciona labels para identificar os workers
echo "Adicionando labels aos nós workers..."
WORKER1=$(kubectl get nodes -l '!node-role.kubernetes.io/control-plane' -o jsonpath='{.items[0].metadata.name}')
WORKER2=$(kubectl get nodes -l '!node-role.kubernetes.io/control-plane' -o jsonpath='{.items[1].metadata.name}')

kubectl label node $WORKER1 node-role.kubernetes.io/worker=worker workload=general
kubectl label node $WORKER2 node-role.kubernetes.io/worker=worker workload=intensive

echo "Cluster em execução com 3 nós. Use Ctrl+C para parar."
echo "Você pode usar 'kubectl get nodes' para ver os nós disponíveis."
tail -f /dev/null