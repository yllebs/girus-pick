# Guia do Tema LINUXtips

Este documento fornece informações sobre como utilizar e personalizar o tema da LINUXtips em sua aplicação.

## Cores do Tema

O tema da LINUXtips utiliza as seguintes cores principais:

- **Laranja LINUXtips**: `#FF9900` - Cor principal da marca, usada em destaque e botões principais
- **Preto LINUXtips**: `#1c1e22` - Cor de fundo principal
- **Cinza escuro**: `#2d323b` - Cor secundária para cards e elementos de UI
- **Azul Kubernetes**: `#326CE5` - Cor para elementos relacionados ao Kubernetes

## Componentes Customizados

### Cards

```css
.linuxtips-card {
    background-color: #2d323b;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.linuxtips-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
```

### Botões

```css
.linuxtips-btn {
    background-color: #FF9900;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.2s;
}

.linuxtips-btn:hover {
    background-color: #e88a00;
}

.linuxtips-btn.k8s {
    background-color: #326CE5;
}
```

### Terminal

```css
.linuxtips-terminal {
    background-color: #1c1e22;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.linuxtips-terminal-header {
    background-color: #2d323b;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
}
```

## Tipografia

O tema utiliza a fonte "Inter" como padrão:

```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

## Como Customizar

Para customizar o tema, você pode modificar as variáveis CSS em `src/styles/linuxtips-theme.css`:

```css
:root {
    --linuxtips-orange: #FF9900;
    --linuxtips-black: #1c1e22;
    --linuxtips-dark-gray: #2d323b;
    --linuxtips-light-gray: #e0e0e0;
    --linuxtips-k8s-blue: #326CE5;
}
```

## Exemplos de Uso

### Cabeçalho da Página

```jsx
<header className="linuxtips-header">
    <div className="linuxtips-navbar">
        <img src={logo} alt="LINUXtips" className="linuxtips-logo" />
        <nav className="linuxtips-nav-links">
            <a href="/" className="linuxtips-nav-link active">Home</a>
            <a href="/labs" className="linuxtips-nav-link">Laboratórios</a>
        </nav>
    </div>
</header>
```

### Card de Laboratório

```jsx
<div className="linuxtips-card">
    <div className="linuxtips-card-header">
        <h3>Nome do Laboratório</h3>
    </div>
    <div className="linuxtips-card-content">
        <p>Descrição do laboratório...</p>
    </div>
    <div className="linuxtips-card-footer">
        <button className="linuxtips-btn">Iniciar Lab</button>
    </div>
</div>
```

## Recomendações

1. Mantenha a consistência visual usando as classes CSS fornecidas
2. Use as cores da marca para elementos importantes
3. Para laboratórios de Kubernetes, use a classe `.k8s` nos elementos relacionados
4. Prefira os componentes pré-estilizados para manter a consistência

Para mais informações, consulte a documentação completa em [linuxtips.io/docs](https://linuxtips.io/docs). 