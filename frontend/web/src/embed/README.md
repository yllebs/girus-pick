# Girus Embed - Guia de Integração

Este diretório contém os recursos necessários para incorporar a plataforma Girus em seu próprio site ou aplicação web.

## Conteúdo

- `EmbedCode.txt` - Código HTML básico para incorporar o Girus em qualquer página web
- `EmbedDemo.html` - Página de demonstração interativa mostrando como usar a API de integração
- `README.md` - Este guia explicativo

## Guia Rápido de Integração

### 1. Incorporação Básica

Para incorporar o Girus em seu site, basta copiar e colar o seguinte código HTML:

```html
<div id="girus-embed-container" style="width: 100%; height: 100vh; overflow: hidden;">
  <iframe 
    id="girus-iframe" 
    src="https://app.girus.cloud" 
    style="width: 100%; height: 100%; border: none;" 
    allowfullscreen>
  </iframe>
</div>
```

### 2. Configuração Avançada

Você pode personalizar o comportamento do Girus adicionando parâmetros de URL:

```html
<iframe 
  id="girus-iframe" 
  src="https://app.girus.cloud?theme=dark&hideHeader=true&autoLogin=true&partnerName=MinhaPlatforma" 
  style="width: 100%; height: 100%; border: none;" 
  allowfullscreen>
</iframe>
```

Parâmetros disponíveis:
- `theme` - Define o tema ('dark' ou 'light')
- `hideHeader` - Oculta o cabeçalho do Girus quando true
- `autoLogin` - Tenta login automático quando true
- `partnerName` - Nome da sua plataforma (para fins de rastreamento)
- `defaultLab` - ID do laboratório a ser carregado automaticamente

### 3. API de Comunicação

O Girus oferece uma API baseada em `window.postMessage` para permitir comunicação bidirecional entre sua aplicação e o iframe incorporado.

#### Enviar Comandos para o Girus

```javascript
// Função para enviar comandos para o Girus
function sendGirusCommand(command, data = {}) {
  const iframe = document.getElementById('girus-iframe');
  iframe.contentWindow.postMessage({
    type: 'girus:command',
    command: command,
    data: data
  }, 'https://app.girus.cloud');
}

// Exemplos de uso:
sendGirusCommand('openLab', { labId: 'kubernetes-intro' });
sendGirusCommand('resetLab');
sendGirusCommand('setTheme', { theme: 'light' });
sendGirusCommand('toggleHeader', { hide: true });
```

#### Receber Eventos do Girus

```javascript
// Configurar receptor de eventos
window.addEventListener('message', function(event) {
  // Verificar a origem da mensagem para segurança
  if (event.origin !== 'https://app.girus.cloud') return;
  
  // Processar mensagens do Girus
  if (event.data.type === 'girus:event') {
    console.log('Evento do Girus:', event.data);
    
    // Exemplo de como reagir a eventos
    if (event.data.event === 'lab:completed') {
      // Atualizar progresso do usuário em seu sistema
      updateUserProgress(event.data.labId);
    }
  }
});
```

## Eventos Disponíveis

O Girus envia os seguintes eventos que sua aplicação pode monitorar:

| Evento | Descrição | Dados |
|--------|-----------|-------|
| `user:authenticated` | Usuário autenticado | `{ userId, email }` |
| `lab:started` | Laboratório iniciado | `{ labId, labName }` |
| `lab:completed` | Laboratório concluído | `{ labId, labName, completionTime }` |
| `task:completed` | Tarefa concluída | `{ labId, taskId, taskName }` |
| `error` | Ocorreu um erro | `{ code, message }` |

## Comandos Disponíveis

Sua aplicação pode enviar os seguintes comandos para o Girus:

| Comando | Descrição | Dados |
|---------|-----------|-------|
| `openLab` | Abrir um laboratório específico | `{ labId }` |
| `resetLab` | Reiniciar o laboratório atual | `{}` |
| `setTheme` | Alterar o tema | `{ theme: 'dark' ou 'light' }` |
| `toggleHeader` | Mostrar/ocultar cabeçalho | `{ hide: true ou false }` |
| `logout` | Fazer logout do usuário | `{}` |

## Considerações para Autenticação

Por padrão, o usuário precisará fazer login no Girus. Se você desejar implementar SSO (Single Sign-On), entre em contato com nossa equipe pelo email suporte@girus.cloud para configurar a integração específica para sua plataforma.

## Exemplo Completo

Veja o arquivo `EmbedDemo.html` para um exemplo funcional completo que demonstra todos os recursos da API de integração.

## Suporte

Para obter ajuda ou reportar problemas:

- GitHub: [github.com/badtuxx/girus](https://github.com/badtuxx/girus)
- Discord: [LINUXtips Community](https://discord.gg/linuxtips)
- Email: suporte@girus.cloud 