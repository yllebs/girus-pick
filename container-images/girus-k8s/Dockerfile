FROM docker:28.2.2-dind-alpine3.22

# Instala dependências
RUN apk add --no-cache \
    curl \
    bash \
    git \
    go \
    kubectl

# Instala Kind
RUN curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.29.0/kind-linux-amd64 && \
    chmod +x /usr/local/bin/kind

# Adiciona o script de inicialização
COPY entrypoint-multi-node.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint-multi-node.sh

# Porta para API do Kubernetes
EXPOSE 6443

# Inicia o script
ENTRYPOINT ["entrypoint-multi-node.sh"]