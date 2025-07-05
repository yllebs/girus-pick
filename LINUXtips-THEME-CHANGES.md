# Implementação do Tema LINUXtips no girus

Este documento descreve as alterações realizadas para implementar o tema da LINUXtips no frontend da plataforma girus.

## Alterações Realizadas

### 1. Estrutura de Arquivos

- **Imagens**: Adicionados logos da LINUXtips e Kubernetes em SVG em `web/src/assets/images/`
- **CSS**: Criado arquivo de tema principal em `web/src/styles/linuxtips-theme.css`
- **Scripts**: Adicionado script `copy-assets.sh` para copiar assets para o diretório público durante o build

### 2. Componentes Criados

- `LabSelector`: Atualizado para mostrar cards no estilo LINUXtips, com diferenciação visual para labs Kubernetes
- `LabWorkspace`: Atualizado para usar o tema LINUXtips na interface de terminal e instruções
- `App.tsx`: Atualizado para usar o tema LINUXtips no AppBar e configuração de cores

### 3. Tema Visual

#### Cores

- **Principal**: #FF9900 (laranja LINUXtips)
- **Secundária**: #326CE5 (azul Kubernetes)
- **Fundo**: #1c1e22 (cinza escuro)
- **Cartões**: #2d323b (cinza médio)
- **Texto**: #e0e0e0 (branco acinzentado)

#### Tipografia

- **Fonte Principal**: 'Inter', sans-serif
- **Código**: 'Menlo', 'Monaco', 'Courier New', monospace

#### Elementos

- **Cards**: Cartões com efeito de elevação ao passar o mouse, com cabeçalhos coloridos diferentes para labs Linux e Kubernetes
- **Botões**: Botões estilizados com cor principal laranja e secundária azul para Kubernetes
- **Dicas**: Componente de dica visual com ícone e borda destacada
- **Terminal**: Terminal com fundo escuro e texto claro
- **Validação**: Mensagens de sucesso e erro com cores e estilos apropriados

### 4. HTML e Público

- **index.html**: Atualizado com carregamento de fontes, meta tags, banner LINUXtips e tela de carregamento
- **public/**: Configurado para receber as imagens durante o build

### 5. Automação

- Scripts `prebuild` e `prestart` adicionados ao package.json para garantir que os assets sejam copiados automaticamente

## Como Manter

Para manter o tema LINUXtips:

1. **Alterações visuais**:
   - Edite as variáveis CSS em `web/src/styles/linuxtips-theme.css`
   - Atualize imagens em `web/src/assets/images/`

2. **Novos componentes**:
   - Utilize as classes CSS definidas no arquivo de tema
   - Mantenha a consistência com as cores e estilos definidos

3. **Atualizações**:
   - Execute o script `./copy-assets.sh` após adicionar novas imagens
   - Reinicie o servidor de desenvolvimento após alterações no tema

## Verificações

Para garantir que o tema está funcionando corretamente:

- Verifique se os logos aparecem em todas as páginas
- Confirme que os cards de laboratórios Kubernetes têm o estilo correto (azul)
- Verifique se os botões e notificações seguem o padrão de cores
- Teste a responsividade em diferentes tamanhos de tela 