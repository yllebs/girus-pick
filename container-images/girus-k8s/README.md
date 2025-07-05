# Kubernetes Single-Node em Container

Este projeto cria uma imagem Docker que inicia automaticamente um cluster Kubernetes single-node usando Kind (Kubernetes in Docker), configurado com permissões RBAC especiais para o namespace `lab-test-user`.

## Características

- Baseado no Kubernetes v1.29.2 usando Kind
- Inicialização rápida de um cluster completo single-node
- Configuração automática de RBAC para o namespace `lab-test-user`
- Permissões de administrador para os ServiceAccounts no namespace `lab-test-user`
- Pode ser executado dentro de outro cluster Kubernetes

## Pré-requisitos

- Docker instalado

## Como usar

### Construir e executar

```bash
# Modo fácil: use o script automatizado
./executar.sh

# OU manualmente:
# Construir a imagem
docker build -t k8s-single-node .

# Criar diretório para o kubeconfig
mkdir -p kubeconfig
chmod 777 kubeconfig

# Executar o container
docker run -d --name k8s-single-node \
  --privileged \
  --hostname k8s-server \
  -p 6443:6443 \
  -v $PWD/kubeconfig:/output \
  --tmpfs /run \
  --tmpfs /var/run \
  --device /dev/fuse \
  k8s-single-node
```

### Verificar o status

```bash
# Verificar se o container está rodando
docker ps | grep k8s-single-node

# Ver os logs do container
docker logs -f k8s-single-node
```

### Acessar o cluster

Após alguns segundos, o arquivo kubeconfig estará disponível no diretório `kubeconfig/`. Você pode usar este arquivo para se conectar ao cluster:

```bash
export KUBECONFIG=$PWD/kubeconfig/kubeconfig.yaml
kubectl get nodes
```

## Namespace lab-test-user

O cluster vem pré-configurado com um namespace especial `lab-test-user` que possui permissões de administrador. Todos os ServiceAccounts neste namespace têm permissões completas no cluster.

Para usar este namespace:

```bash
# Criar recursos no namespace lab-test-user
kubectl create -n lab-test-user deployment nginx --image=nginx

# Verificar permissões do ServiceAccount default no namespace lab-test-user
kubectl --as=system:serviceaccount:lab-test-user:default get nodes
```

Este namespace é ideal para testes e desenvolvimento, onde você precisa de permissões administrativas sem precisar configurar RBAC manualmente.

## Usando dentro de outro cluster Kubernetes

Esta imagem foi projetada para poder ser executada dentro de um cluster Kubernetes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: k8s-in-k8s
spec:
  containers:
  - name: k8s
    image: seu-registry/k8s-single-node:latest
    securityContext:
      privileged: true
    ports:
    - containerPort: 6443
    volumeMounts:
    - name: kubeconfig
      mountPath: /output
  volumes:
  - name: kubeconfig
    emptyDir: {}
```

## Encerrando o cluster

```bash
docker stop k8s-single-node
docker rm k8s-single-node
``` 