# DevOps Training Container

Este container Docker é uma imagem completa para treinamentos de Linux, Docker, Kubernetes e Terraform, contendo todas as ferramentas DevOps essenciais pré-instaladas.

## Ferramentas Incluídas

- **Sistemas**: vim, nano, curl, wget, git, jq, bash-completion
- **Redes**: ping, dig, nslookup, netcat, netstat, ssh
- **Containers**: Docker (completo, com daemon isolado)
- **Kubernetes**: kubectl, helm, k9s, kubectx, kubens
- **IaC**: Terraform
- **Cloud**: AWS CLI, Azure CLI, Google Cloud SDK
- **Linguagens**: Python 3

## Como Construir a Imagem

```bash
# Navegue até o diretório do Dockerfile
cd devops-training-container

# Construa a imagem
docker build -t devops-training:latest .
```

## Como Usar

### Executar o Container

```bash
# Iniciar o container com modo interativo e privilegiado (necessário para Docker interno)
docker run --privileged -it --name devops-training devops-training:latest

# Para montar um volume local para persistência de dados
docker run --privileged -it --name devops-training -v $(pwd)/workspace:/home/estudante/workspace devops-training:latest
```

### Comandos Úteis

```bash
# Iniciar um container já existente
docker start -ai devops-training

# Executar comandos adicionais em um container em execução
docker exec -it devops-training bash

# Remover o container
docker rm devops-training
```

## Docker-in-Docker

Esta imagem está configurada com Docker-in-Docker (DinD), permitindo que os alunos usem o Docker dentro do container sem depender do Docker do host. Isso proporciona:

1. Ambiente Docker totalmente isolado para os alunos
2. Nenhuma interferência com os containers do host
3. Os alunos não podem ver os containers do host
4. Perfeito para ambiente de treinamento

### Usando o Docker no Container

Após iniciar o container com a flag `--privileged`, o aluno deve executar o comando `inicia-docker` para iniciar o daemon Docker:

```bash
# Dentro do container, para iniciar o Docker:
inicia-docker
```

O Docker será iniciado e estará pronto para uso. Os alunos podem criar e executar seus próprios containers que ficarão isolados dentro do ambiente de treinamento.

### Importante

- O container **deve** ser iniciado com a flag `--privileged` para que o Docker funcione internamente
- Ao encerrar o container, todos os containers criados pelo aluno serão perdidos

## Configuração para Treinamentos

### Kubernetes

Para usar kubectl com um cluster externo, você pode:

1. Montar um arquivo kubeconfig existente:
   ```bash
   docker run --privileged -it --name devops-training -v ~/.kube/config:/home/estudante/.kube/config devops-training:latest
   ```

2. Ou configurar o acesso a um cluster Kind/Minikube já em execução no host.

### Terraform

Para trabalhar com Terraform, é recomendado criar um volume para persistir o estado:

```bash
docker run --privileged -it --name devops-training -v $(pwd)/terraform:/home/estudante/terraform devops-training:latest
```

## Personalização

Para personalizar a imagem para suas necessidades específicas, você pode:

1. Adicionar mais pacotes modificando o Dockerfile
2. Configurar variáveis de ambiente adicionais
3. Adicionar scripts de inicialização

## Notas para Instrutores

- O usuário padrão no container é `estudante` com permissões sudo (sem senha)
- O prompt foi configurado como `estudante@girus:~$` para melhor identidade visual
- O Docker precisa ser iniciado manualmente pelos alunos usando o comando `inicia-docker`
- É necessário executar o container com a flag `--privileged` para que o Docker funcione internamente
- Todos os recursos podem ser acessados sem privilégios adicionais
- A imagem foi projetada para ser usada em ambientes de treinamento, com todas as ferramentas mais utilizadas já instaladas 