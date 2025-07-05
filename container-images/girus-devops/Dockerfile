FROM debian:bookworm-slim

LABEL maintainer="Girus <contato@linuxtips.io>"
LABEL description="DevOps Training Container with essential tools for Linux, Docker, Kubernetes and Terraform courses"

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install common tools and dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    wget \
    git \
    vim \
    jq \
    iputils-ping \
    dnsutils \
    net-tools \
    openssh-client \
    procps \
    htop \
    tmux \
    bash-completion \
    tree \
    sudo \
    locales \
    iptables \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt/archives/*

# Set up locale
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# Install Docker (Full version, not just CLI)
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    # Enable and configure docker daemon to start with systemd
    && mkdir -p /etc/docker \
    && echo '{"storage-driver": "vfs"}' > /etc/docker/daemon.json

# Install kubectl
RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | gpg --dearmor -o /usr/share/keyrings/kubernetes-apt-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /" | tee /etc/apt/sources.list.d/kubernetes.list && \
    apt-get update && \
    apt-get install -y kubectl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list && \
    apt-get update && \
    apt-get install -y terraform \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up kubectl completion
RUN kubectl completion bash > /etc/bash_completion.d/kubectl

# Create a non-root user for training
RUN useradd -m -s /bin/bash estudante && \
    echo "estudante ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/estudante

# Set up welcome message and prompt
RUN echo 'echo "Bem-vindo ao container Girus DevOps!"' >> /home/estudante/.bashrc && \
    echo 'echo "Este container inclui ferramentas para os treinamentos da LINUXtips."' >> /home/estudante/.bashrc && \
    echo 'echo "Digite: comando --help para obter ajuda com qualquer comando."' >> /home/estudante/.bashrc && \
    echo 'echo ""' >> /home/estudante/.bashrc && \
    echo 'PS1="\[\033[01;32m\]estudante@girus\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$ "' >> /home/estudante/.bashrc

# Add Docker service starter script
RUN echo '#!/bin/bash\n\
    \n\
    echo "Iniciando o serviço Docker dentro do container..."\n\
    echo "Esta operação requer privilégios de administrador."\n\
    \n\
    # Verificar se o container está em modo privilegiado\n\
    if [ ! -w "/sys" ]; then\n\
    echo "ERRO: Container não está em modo privilegiado."\n\
    echo "Para usar o Docker-in-Docker, reinicie o container com a flag --privileged:"\n\
    echo "docker run --privileged -it --name devops-training devops-training:latest"\n\
    exit 1\n\
    fi\n\
    \n\
    # Iniciar o daemon Docker\n\
    if ps aux | grep -v grep | grep -q dockerd; then\n\
    echo "O Docker já está em execução! Use: docker ps"\n\
    exit 0\n\
    fi\n\
    \n\
    echo "Iniciando o daemon Docker..."\n\
    sudo dockerd &>/var/log/dockerd.log &\n\
    DOCKER_PID=$!\n\
    \n\
    # Verificar se o processo está rodando\n\
    if ! ps -p $DOCKER_PID > /dev/null; then\n\
    echo "Falha ao iniciar o Docker. Verificando logs:"\n\
    tail /var/log/dockerd.log\n\
    exit 1\n\
    fi\n\
    \n\
    # Aguardar o Docker iniciar\n\
    echo "Aguardando o Docker iniciar..."\n\
    for i in $(seq 1 15); do\n\
    if docker info &>/dev/null; then\n\
    echo "Docker iniciado com sucesso!"\n\
    docker ps\n\
    exit 0\n\
    fi\n\
    echo -n "."\n\
    sleep 1\n\
    done\n\
    \n\
    echo ""\n\
    echo "Docker parece não ter iniciado corretamente. Verifique os logs:"\n\
    tail /var/log/dockerd.log\n\
    ' > /usr/local/bin/inicia-docker && \
    chmod +x /usr/local/bin/inicia-docker

# Add estudante to the docker group
RUN usermod -aG docker estudante

USER estudante
WORKDIR /home/estudante

# No entrypoint is needed - user will manually run inicia-docker when ready
CMD ["/bin/bash"] 