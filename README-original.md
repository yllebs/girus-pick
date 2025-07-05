![GIRUS](./github/girus-logo.png)

# Desafio PICK: Criação de Imagens para GIRUS

## Importante: Política de Confidencialidade

É estritamente proibida a reprodução ou compartilhamento deste desafio e de qualquer material relacionado a ele antes do dia da apresentação dos trabalhos. Todos os participantes devem manter o conteúdo do desafio em sigilo até a conclusão oficial do programa. O não cumprimento desta política poderá resultar em desqualificação do desafio e a perda do direito de participar do programa.

Ao participar do desafio, você concorda com a política de confidencialidade e concorda em não compartilhar o desafio com terceiros.

## Visão Geral do Desafio

Este repositório contém o desafio para os alunos do PICK (Programa Intensivo em Containers e Kubernetes) da LINUXtips. O objetivo é criar imagens Docker otimizadas para o GIRUS - uma plataforma open-source de laboratórios interativos para aprendizado prático de tecnologias como Linux, Docker, Kubernetes e outras ferramentas DevOps.

## Objetivos do Desafio

Durante os próximos 30 dias, os estudantes deverão:

1. **Criar imagens Docker para:**
   - Backend (Go): Uma imagem otimizada para executar a API do GIRUS
   - Frontend (React): Uma imagem para a interface web do GIRUS
   - Kubernetes com Istio: Uma imagem baseada no container-images/girus-k8s, mas com Istio integrado

2. **Requisitos técnicos:**
   - As imagens devem ter o menor número possível de vulnerabilidades críticas
   - Utilizar repositório privado para armazenar as imagens
   - Seguir boas práticas de construção de imagens Docker
   - Implementar um deployment usando Helm

## Estrutura do Projeto

O projeto GIRUS possui a seguinte estrutura:

1. **Backend (Go)**: API para orquestrar laboratórios via Kubernetes
2. **Frontend (React)**: Interface web com terminal interativo
3. **Container Images**:
   - `girus-k8s`: Imagem com Kind e Kubernetes para laboratórios de K8s
   - `girus-devops`: Imagem com ferramentas de DevOps para laboratórios práticos
   - `girus-localstack`: Imagem com LocalStack para simular serviços AWS

Você deve se basear nos Dockerfiles existentes em `container-images/` para criar suas próprias versões otimizadas.

## Testes da Aplicação

### Testando o Backend

1. **Build e execução local do backend**:
   ```bash
   # No diretório backend execute
   go run main.go
   ```

2. **Executando sua imagem Docker do backend**:
   ```bash
   # Construa sua imagem
   docker build -t seu-repo/strigus-backend:versao -f Dockerfile.backend .
   
   # Execute localmente
   docker run -p 8080:8080 -v ~/.kube/config:/root/.kube/config seu-repo/strigus-backend:versao

   # Run with the env var set
   docker run -p 8080:8080 \
   -v ~/.kube/config:/root/.kube/config \
   -e KUBECONFIG=/root/.kube/config \
   girus-backend

   # Verifique se a API está respondendo
   curl http://localhost:8080/api/v1/health
   ```

### Testando o Frontend

1. **Desenvolvimento local do frontend**:
   ```bash
   # Entre no diretório frontend/web
   cd frontend/web
   
   # Instale dependências
   npm install
   
   # Execute em modo de desenvolvimento
   npm start
   ```

2. **Testando sua imagem Docker do frontend**:
   ```bash
   # Construa sua imagem
   docker build -t seu-repo/strigus-frontend:versao -f Dockerfile.frontend web/
   
   # Execute localmente (apontando para o backend)
   docker run -p 3000:80 -e BACKEND_URL=http://localhost:8080 seu-repo/strigus-frontend:versao
   ```

### Integrando com o Cluster GIRUS

1. **Substituindo as imagens no cluster existente**:
   ```bash
   # Encontre os deployments existentes
   kubectl get deployments -n girus
   
   # Atualize a imagem do backend
   kubectl set image deployment/girus-backend backend=seu-repo/strigus-backend:versao -n girus
   
   # Atualize a imagem do frontend
   kubectl set image deployment/girus-frontend frontend=seu-repo/strigus-frontend:versao -n girus
   ```

2. **Verificação dos logs para debug**:
   ```bash
   # Verifique logs do backend
   kubectl logs -f deployment/girus-backend -n girus
   
   # Verifique logs do frontend
   kubectl logs -f deployment/girus-frontend -n girus
   ```

Para testar corretamente suas imagens, certifique-se de que todas as variáveis de ambiente necessárias estejam configuradas e os volumes adequados estejam montados para acesso ao Kubernetes.

## Fluxo de Trabalho para Teste

Para testar suas imagens, siga estas etapas:

1. **Instale o GIRUS CLI**:
   ```bash
   curl -fsSL https://girus.linuxtips.io | bash
   ```

2. **Crie um cluster de teste**:
   ```bash
   girus create cluster
   ```

3. **Carregue suas imagens customizadas no cluster**:
   ```bash
   # Substitua [seu-repositorio], [sua-imagem] e [versao] pelos valores corretos
   kind load docker-image [seu-repositorio]/girus-frontend:[versao] --name girus
   kind load docker-image [seu-repositorio]/girus-backend:[versao] --name girus
   kind load docker-image [seu-repositorio]/girus-k8s-istio:[versao] --name girus
   ```

4. **Substitua as imagens originais pelas suas**:
   - Edite os manifestos do Kubernetes ou valores do Helm para apontar para suas imagens
   - Reimplante os componentes do GIRUS com suas imagens personalizadas

## Entregáveis

1. **Dockerfiles otimizados** para:
   - Backend
   - Frontend
   - Kubernetes com Istio

2. **Relatório de vulnerabilidades** das imagens

3. **Repositório privado** com as imagens

4. **Charts Helm** para deployment da aplicação

5. **README detalhado** com explicações sobre:
   - Escolhas de otimização
   - Como utilizar as imagens
   - Processo de deployment
   - Lições aprendidas

## Critérios de Avaliação

Os projetos serão avaliados com base em:

1. **Segurança**: Redução de vulnerabilidades nas imagens
2. **Otimização**: Tamanho e camadas das imagens
3. **Funcionalidade**: Correto funcionamento da aplicação
4. **Documentação**: Clareza e completude do README
5. **Automação**: Implementação de CI/CD e Helm charts

## Recursos Adicionais

- **Container Images**: Explore os Dockerfiles existentes em `container-images/`
- **Código Fonte**: Analise `web/` (frontend) e `internal/` (backend) para entender os requisitos
- **Documentação**: Leia o README.md original do GIRUS para compreender a plataforma

## Dicas para o Desafio

1. **Analise as dependências** antes de criar os Dockerfiles
2. **Utilize imagens base leves** como alpine ou distroless quando possível
3. **Implemente multi-stage builds** para reduzir o tamanho final
4. **Escaneie suas imagens** com ferramentas como Trivy ou Clair
5. **Teste exaustivamente** antes da entrega final

## Suporte

Em caso de dúvidas, utilize o Discord/Telegram da LINUXtips e o canal específico do PICK para suporte.

----------------------------------------------------------------------------------------------------------

# GIRUS: Plataforma de Laboratórios Interativos

## Visão Geral

GIRUS é uma plataforma open-source de laboratórios interativos que permite a criação, gerenciamento e execução de ambientes de aprendizado prático para tecnologias como Linux, Docker, Kubernetes, Terraform e outras ferramentas essenciais para profissionais de DevOps, SRE e Platform Engineering.

Desenvolvida pela LINUXtips, a plataforma GIRUS se diferencia por ser executada localmente na máquina do usuário, eliminando a necessidade de infraestrutura na nuvem ou configurações complexas. Através de um CLI intuitivo, os usuários podem criar rapidamente ambientes isolados e seguros onde podem praticar e aperfeiçoar suas habilidades técnicas.

## Principais Diferenciais

- **Execução Local**: Diferentemente de outras plataformas como Katacoda ou Instruqt que funcionam como SaaS, o GIRUS é executado diretamente na máquina do usuário através de containers Docker e Kubernetes, e o melhor, é que o projeto é open source e gratuito.
- **Ambientes Isolados**: Cada laboratório é executado em um ambiente isolado no Kubernetes, garantindo segurança e evitando conflitos com o sistema host
- **Interface Intuitiva**: Terminal interativo com tarefas guiadas e validação automática de progresso
- **Fácil Instalação**: CLI simples que gerencia todo o ciclo de vida da plataforma (criação, execução e exclusão)
- **Laboratórios Personalizáveis**: Sistema de templates baseado em ConfigMaps do Kubernetes que facilita a criação de novos laboratórios
- **Open Source**: Projeto totalmente aberto para contribuições da comunidade
- **Multilíngue**: Criado originalmente para o português, mas com um sistema de templates flexível, é possível criar laboratórios em outros idiomas. Nas versões futuras, o sistema de templates será expandido para suportar múltiplos idiomas.

## Arquitetura

O projeto GIRUS é composto por quatro componentes principais:

1. **GIRUS CLI**: Ferramenta de linha de comando que gerencia todo o ciclo de vida da plataforma
2. **Backend**: API Golang que orquestra os laboratórios através da API do Kubernetes
3. **Frontend**: Interface web React que fornece acesso ao terminal interativo e às tarefas
4. **Templates de Laboratórios**: Definições YAML para os diferentes laboratórios disponíveis

### Diagrama de Fluxo de Arquitetura

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  GIRUS CLI  │────▶│ Kind Cluster │────▶│ Kubernetes   │
└─────────────┘     └──────────────┘     └──────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Terminal   │◀───▶│   Frontend   │◀───▶│   Backend    │
│ Interativo  │     │    (React)   │     │     (Go)     │
└─────────────┘     └──────────────┘     └──────────────┘
                                               │
                                               ▼
                                         ┌──────────────┐
                                         │  Templates   │
                                         │     Labs     │
                                         └──────────────┘
```

## Componentes Detalhados

### GIRUS CLI

O GIRUS CLI é a porta de entrada para a plataforma, proporcionando uma interface de linha de comando simples para gerenciar todo o ambiente. Desenvolvido em Go, ele automatiza a criação do cluster Kubernetes usando Kind (Kubernetes in Docker), a implantação dos componentes da plataforma, e o gerenciamento dos laboratórios.

#### Principais Comandos

- **`girus create cluster`**: Cria um novo cluster Kind e implanta todos os componentes da plataforma
- **`girus list clusters`**: Lista os clusters existentes e seus status
- **`girus list labs`**: Lista os laboratórios disponíveis na plataforma
- **`girus delete cluster`**: Remove o cluster GIRUS e libera os recursos

#### Fluxo de Instalação

1. Verificação de dependências (Docker, Kind, kubectl)
2. Instalação de dependências faltantes (opcional)
3. Criação do cluster Kubernetes com Kind
4. Implantação do backend e frontend
5. Configuração do port-forwarding (8080 para backend, 8000 para frontend)
6. Abertura automática do navegador com a interface web

### Backend (Golang)

O backend é o coração da plataforma GIRUS, responsável por orquestrar os ambientes Kubernetes para cada laboratório. Desenvolvido em Go com o framework Gin, ele gerencia o ciclo de vida dos laboratórios, fornece endpoints RESTful para o frontend, e implementa a validação automática das tarefas.

#### Principais Componentes do Backend

- **LabManager**: Orquestra a criação, monitoramento e exclusão de recursos Kubernetes
- **TemplateManager**: Gerencia os templates de laboratórios disponíveis
- **API Handlers**: Implementa os endpoints RESTful e WebSocket
- **Validators**: Verifica o progresso das tarefas e fornece feedback imediato

#### Endpoints Principais

- `/api/v1/templates`: Retorna a lista de templates de laboratórios disponíveis
- `/api/v1/labs`: Cria um novo laboratório
- `/api/v1/labs/{namespace}/{pod}/validate`: Valida uma tarefa específica
- `/ws/terminal/{namespace}/{pod}`: Endpoint WebSocket para o terminal interativo

### Frontend (React)

O frontend do GIRUS proporciona uma interface web moderna e responsiva para interação com os laboratórios. Desenvolvido com React, TypeScript e Material-UI, ele apresenta um terminal interativo, instruções de tarefas, e feedback visual sobre o progresso.

#### Principais Recursos do Frontend

- **Terminal Interativo**: Implementado com xterm.js e conectado via WebSocket ao pod do laboratório
- **Painel de Tarefas**: Exibe instruções passo a passo e botões de validação
- **Navegação entre Tarefas**: Permite avançar e retroceder entre diferentes etapas do laboratório
- **Feedback Visual**: Indicadores de progresso e mensagens de validação
- **Seletor de Laboratórios**: Interface para escolher entre os diferentes laboratórios disponíveis

### Templates de Laboratórios

Os templates são a base para a criação dos laboratórios no GIRUS. Definidos como ConfigMaps do Kubernetes em formato YAML, eles especificam as tarefas, passos, validadores e recursos necessários para cada laboratório.

#### Estrutura de um Template

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: lab-linux-basics
  namespace: girus
  labels:
    app: girus-lab-template
data:
  lab.yaml: |
    name: linux-basics
    title: "Introdução ao Linux"
    description: "Laboratório básico para praticar comandos Linux essenciais"
    duration: 30m
    tasks:
      - name: "Navegação básica"
        description: "Pratique comandos básicos de navegação"
        steps:
          - "Use 'pwd' para ver o diretório atual"
          - "Liste os arquivos com 'ls -la'"
          - "Crie um diretório chamado 'test' com 'mkdir test'"
        validation:
          - command: "test -d test"
            expectedOutput: ""
            errorMessage: "Diretório 'test' não foi criado"
```

## Fluxo de Trabalho do Usuário

1. **Instalação do GIRUS CLI**:
   ```bash
   curl -fsSL https://girus.linuxtips.io | bash
   ```

2. **Criação do Ambiente**:
   ```bash
   girus create cluster
   ```

3. **Acesso à Interface Web**:
   O navegador é aberto automaticamente em `http://localhost:8000`

4. **Seleção de Laboratório**:
   O usuário escolhe entre os laboratórios disponíveis na interface

5. **Execução do Laboratório**:
   - Um namespace e pod específicos são criados para o usuário
   - O terminal interativo é conectado ao pod via WebSocket
   - O painel de tarefas exibe as instruções para a primeira tarefa

6. **Realização das Tarefas**:
   - O usuário executa os comandos no terminal
   - Ao concluir uma etapa, clica em "Verificar"
   - O sistema valida a tarefa e fornece feedback
   - O usuário avança para a próxima tarefa

7. **Conclusão do Laboratório**:
   - Ao completar todas as tarefas, o usuário recebe uma mensagem de congratulações
   - Os recursos são marcados para limpeza automática

8. **Limpeza do Ambiente**:
   ```bash
   girus delete cluster
   ```

## Laboratórios

O GIRUS oferece uma variedade de laboratórios em diferentes áreas tecnológicas, por exemplo:

### Linux Fundamentals
- **Introdução ao Linux**: Comandos básicos, navegação, manipulação de arquivos
- **Gerenciamento de Usuários e Permissões**: Criação de usuários, grupos, chmod, chown
- **Administração de Serviços**: Systemd, logs, monitoramento

### Kubernetes 
- **Fundamentos de Kubernetes**: Pods, deployments, services, namespaces
- **Configuração e Armazenamento**: ConfigMaps, Secrets, Volumes, PersistentVolumes
- **Segurança e Políticas**: RBAC, NetworkPolicies, SecurityContexts

### DevOps & SRE 
- **Configuração de CI/CD**: Pipelines, integração com GitHub Actions
- **Monitoramento e Observabilidade**: Prometheus, Grafana, logs
- **Infraestrutura como Código**: Terraform, Ansible, configurações declarativas

## Requisitos do Sistema

- **Sistema Operacional**: Linux, macOS ou Windows com WSL2
- **Docker**: Versão 20.10 ou superior (em execução)
- **Memória**: Mínimo 4GB disponível
- **Espaço em Disco**: Mínimo 5GB livre
- **Conectividade**: Internet para download inicial das imagens

> **Nota**: O script de instalação do GIRUS CLI verifica e instala automaticamente as dependências necessárias (Kind, kubectl) caso não estejam presentes no sistema.

## Guia de Instalação Detalhado

### Método Automatizado (Recomendado)

1. **Instalação via Script**:
   ```bash
   curl -fsSL https://girus.linuxtips.io | bash
   ```

   Este script realiza as seguintes ações:
   - Verifica a presença do Docker e sua execução
   - Instala Kind e kubectl se necessário
   - Compila e instala o GIRUS CLI
   - Configura as permissões adequadas

2. **Verificação da Instalação**:
   ```bash
   girus --help
   ```

### Instalação Manual

1. **Pré-requisitos**:
   - Instale Docker seguindo as [instruções oficiais](https://docs.docker.com/engine/install/)
   - Instale Go a partir do [site oficial](https://golang.org/dl/)
   - Instale Kind seguindo as [instruções do projeto](https://kind.sigs.k8s.io/docs/user/quick-start/)
   - Instale kubectl seguindo a [documentação do Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

2. **Clone o Repositório**:
   ```bash
   git clone https://github.com/linuxtips/girus.git
   cd girus/girus-cli
   ```

3. **Compile o CLI**:
   ```bash
   go build -o girus
   ```

4. **Instale o CLI**:
   ```bash
   sudo mv girus /usr/local/bin/
   ```

## Criação de Laboratórios Personalizados

Um dos pontos fortes do GIRUS é a facilidade de criação de novos laboratórios. Qualquer pessoa pode contribuir com novos templates seguindo estas etapas:

1. **Estrutura do Template**:
   Crie um arquivo YAML seguindo o formato de ConfigMap do Kubernetes:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: meu-novo-lab
     namespace: girus
     labels:
       app: girus-lab-template
   data:
     lab.yaml: |
       name: meu-lab-id
       title: "Título do Meu Laboratório"
       description: "Descrição detalhada do laboratório"
       duration: 45m
       image: "ubuntu:20.04"  # Imagem base para o pod
       tasks:
         - name: "Nome da Tarefa 1"
           description: "Descrição da tarefa"
           steps:
             - "Passo 1: Faça isso"
             - "Passo 2: Execute aquilo"
           validation:
             - command: "comando para verificar"
               expectedOutput: "saída esperada"
               errorMessage: "Mensagem de erro personalizada"
   ```

2. **Teste o Template**:
   ```bash
   # Aplique o template no cluster GIRUS
   girus create lab -f meu-novo-lab.yaml
   ```

3. **Contribua com o Projeto**:
   - Faça um fork do repositório
   - Adicione seu template ao diretório `/labs`
   - Envie um Pull Request com sua contribuição

## Integração com Sistemas de Aprendizado

O GIRUS foi criado pela LINUXtips para melhorar a experiência de aprendizado dos alunos, mas não é restrito aos alunos da LINUXtips, você pode usar o GIRUS em qualquer lugar que você precise de um ambiente prático para aprender ou testar novas tecnologias, por exemplo:

1. **Complemento para Cursos Online**:
   - Ambiente prático para reforçar conteúdo teórico
   - Validação automatizada de exercícios
   - Experiência hands-on sem necessidade de infraestrutura adicional

2. **Treinamentos Corporativos**:
   - Ambientes padronizados para todos os participantes
   - Fácil distribuição de exercícios práticos
   - Redução de custos com infraestrutura

3. **Preparação para Certificações**:
   - Simulação de ambientes similares aos exames
   - Tarefas baseadas em syllabus oficial
   - Feedback imediato sobre o progresso

## Contribuição e Comunidade

O GIRUS é um projeto open-source que depende da contribuição da comunidade para crescer. Existem várias formas de contribuir:

### Desenvolvimento
- Correção de bugs e melhorias no código-fonte
- Implementação de novos recursos
- Otimização de performance
- Testes e garantia de qualidade

### Criação de Conteúdo
- Desenvolvimento de novos templates de laboratórios
- Tradução do conteúdo para outros idiomas
- Elaboração de tutoriais e documentação

### Divulgação
- Compartilhamento do projeto nas redes sociais
- Apresentações em eventos e conferências
- Artigos sobre o uso e benefícios da plataforma

### Processo de Contribuição
1. Fork o repositório em [GitHub](https://github.com/badtuxx/girus)
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Roadmap de Desenvolvimento

O projeto GIRUS tem um plano de desenvolvimento contínuo com os seguintes objetivos:

### Curto Prazo (3-6 meses)
- Expansão da biblioteca de laboratórios
- Melhorias na interface do usuário
- Suporte a múltiplos idiomas
- Integração com sistemas de badges/conquistas

### Médio Prazo (6-12 meses)
- Implementação de recursos colaborativos
- Sistema de competições e desafios
- Métricas avançadas de progresso
- Suporte a plugins de extensão

### Longo Prazo (12+ meses)
- Plataforma para compartilhamento de laboratórios personalizados
- Marketplace para criadores de conteúdo
- Integração com ferramentas de IA para assistência personalizada
- Suporte a clusters remotos e implantação enterprise

## Suporte e Contato

O projeto GIRUS oferece diferentes canais para suporte e comunicação:

- **GitHub Issues**: [github.com/badtuxx/girus/issues](https://github.com/linuxtips/girus/issues)
- **GitHub Discussions**: [github.com/badtuxx/girus/discussions](https://github.com/linuxtips/girus/discussions)
- **Discord da Comunidade**: [discord.gg/linuxtips](https://discord.gg/linuxtips)

## Licença e Atribuição

O projeto GIRUS é distribuído sob a licença GPLv3, o que significa que:

- Você tem liberdade para usar, modificar e distribuir o software
- Modificações devem ser disponibilizadas sob a mesma licença
- Não há garantia para o software

Para mais detalhes, consulte o arquivo `LICENSE` no repositório.

## Agradecimentos

O GIRUS é possível graças à contribuição de muitas pessoas e projetos:

- **Equipe LINUXtips**: Pelo desenvolvimento e manutenção do projeto
- **Contribuidores**: Desenvolvedores, criadores de conteúdo e tradutores
- **Projetos Open Source**: Go, React, Kubernetes, Kind, Docker e muitos outros
- **Comunidade**: Todos os usuários e apoiadores que acreditam no projeto

---

## FAQ - Perguntas Frequentes

**Q: O GIRUS funciona offline?**  
A: Sim, após a instalação inicial e download das imagens, o GIRUS pode funcionar completamente offline.

**Q: Quanto consome de recursos da minha máquina?**  
A: O GIRUS é otimizado para ser leve. Um cluster básico consome aproximadamente 1-2GB de RAM e requer cerca de 5GB de espaço em disco.

**Q: Posso criar laboratórios personalizados para minha equipe/empresa?**  
A: Absolutamente! O sistema de templates é flexível e permite a criação de laboratórios específicos para suas necessidades.

**Q: Como faço para atualizar o GIRUS para a versão mais recente?**  
A: Execute o mesmo script de instalação novamente ou use `girus update` (disponível em versões mais recentes).

**Q: O GIRUS funciona em ambientes corporativos com restrições de rede?**  
A: Sim, após o download inicial das imagens, o GIRUS opera localmente sem necessidade de conexão externa.

**Q: Posso contribuir com novos laboratórios para o projeto?**  
A: Definitivamente! Contribuições são bem-vindas e valorizadas. Consulte a seção "Contribuição e Comunidade" para detalhes.
