import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { api } from '../services/api';

// API IMPERATIVA DO TERMINAL - Completamente independente do React
// Esta API existe FORA do ciclo de vida do React
const TerminalAPI = (() => {
    let terminal = null;
    let wsConnection = null;
    let fitAddon = null;
    let terminalElement = null;
    let resizeListener = null;
    let connectionStatus = 'disconnected';
    let initialNamespace = null;
    let initialPod = null;
    let attemptedSetup = false;
    let reconnectButton = null;
    let statusIndicator = null;
    let reconnectTimeout = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_TIMEOUT = 30000; // 30 segundos para timeout

    // Criar terminal e anexar ao elemento
    const setupTerminal = (element, namespace, pod) => {
        // Se já configuramos o terminal, não criar um novo
        if (terminal) {
            console.log('[TerminalAPI] Terminal já configurado, mantendo a instância');

            // Apenas atualizar referências se necessário
            if (namespace && pod && (namespace !== initialNamespace || pod !== initialPod)) {
                console.log('[TerminalAPI] Atualizando referências para', namespace, pod);
                initialNamespace = namespace;
                initialPod = pod;
            }

            return true;
        }

        // Primeira inicialização
        if (!attemptedSetup && namespace && pod) {
            console.log('[TerminalAPI] Configurando terminal pela primeira vez');
            attemptedSetup = true;
            initialNamespace = namespace;
            initialPod = pod;

            // Criar terminal
            terminal = new XTerm({
                cursorBlink: true,
                fontSize: 14,
                fontFamily: 'monospace',
                theme: {
                    background: '#1e1e1e',
                    foreground: '#f0f0f0'
                }
            });

            // Configurar addon de ajuste
            fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);

            // Abrir terminal no elemento
            if (element) {
                try {
                    terminalElement = element;
                    terminal.open(element);
                    terminal.writeln('\x1b[1;32mTerminal inicializado. Aguarde o pod estar pronto...\x1b[0m');

                    // Configurar resize
                    resizeListener = () => {
                        try {
                            fitAddon.fit();

                            if (wsConnection?.readyState === WebSocket.OPEN && terminal.cols && terminal.rows) {
                                wsConnection.send(JSON.stringify({
                                    type: 'resize',
                                    cols: terminal.cols,
                                    rows: terminal.rows
                                }));
                            }
                        } catch (e) {
                            console.error('[TerminalAPI] Erro ao redimensionar:', e);
                        }
                    };

                    // Adicionar listener de resize
                    window.addEventListener('resize', resizeListener);

                    // Ajustar tamanho inicial
                    setTimeout(resizeListener, 100);

                    // Criar controles de UI
                    ensureUIControls();

                    // Iniciar conexão após breve delay
                    setTimeout(() => {
                        // Apenas iniciar conexão se ainda não houver uma
                        if (!wsConnection || wsConnection.readyState !== WebSocket.OPEN) {
                            connect();
                        }
                    }, 2000);

                    return true;
                } catch (e) {
                    console.error('[TerminalAPI] Erro ao abrir terminal:', e);
                    terminal = null;
                    fitAddon = null;
                    return false;
                }
            }
        }

        return false;
    };

    // Garantir que os controles de UI existam
    const ensureUIControls = () => {
        if (!terminalElement) return;

        // Criar indicador de status se não existir
        if (!statusIndicator) {
            statusIndicator = document.createElement('div');
            statusIndicator.style.position = 'absolute';
            statusIndicator.style.bottom = '10px';
            statusIndicator.style.right = '10px';
            statusIndicator.style.padding = '5px 10px';
            statusIndicator.style.borderRadius = '4px';
            statusIndicator.style.fontSize = '12px';
            statusIndicator.style.color = 'white';
            statusIndicator.style.zIndex = '1000';
            statusIndicator.style.display = 'none';
            terminalElement.appendChild(statusIndicator);
        }

        // Criar botão de reconexão se não existir
        if (!reconnectButton) {
            reconnectButton = document.createElement('button');
            reconnectButton.textContent = 'Reconectar';
            reconnectButton.style.position = 'absolute';
            reconnectButton.style.bottom = '40px';
            reconnectButton.style.right = '10px';
            reconnectButton.style.backgroundColor = '#4CAF50';
            reconnectButton.style.border = 'none';
            reconnectButton.style.color = 'white';
            reconnectButton.style.padding = '5px 10px';
            reconnectButton.style.textAlign = 'center';
            reconnectButton.style.textDecoration = 'none';
            reconnectButton.style.fontSize = '12px';
            reconnectButton.style.borderRadius = '4px';
            reconnectButton.style.cursor = 'pointer';
            reconnectButton.style.zIndex = '1000';
            reconnectButton.style.display = 'none';
            reconnectButton.onclick = connect;
            terminalElement.appendChild(reconnectButton);
        }

        // Atualizar visibilidade baseado no status
        updateUIStatus();
    };

    // Atualizar UI baseado no status
    const updateUIStatus = () => {
        if (!statusIndicator || !reconnectButton) return;

        if (connectionStatus === 'disconnected' || connectionStatus === 'error') {
            statusIndicator.style.display = 'block';
            reconnectButton.style.display = 'block';

            if (connectionStatus === 'error') {
                statusIndicator.textContent = 'Erro de conexão';
                statusIndicator.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
            } else {
                statusIndicator.textContent = 'Desconectado';
                statusIndicator.style.backgroundColor = 'rgba(255, 165, 0, 0.7)';
            }
        } else {
            statusIndicator.style.display = 'none';
            reconnectButton.style.display = 'none';
        }
    };

    // Atualizar status de conexão
    const setStatus = (newStatus) => {
        connectionStatus = newStatus;
        updateUIStatus();
    };

    // Conectar ao WebSocket
    const connect = () => {
        // Cancelar qualquer tentativa de reconexão pendente
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
        }

        // Se já está conectado, não fazer nada
        if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
            console.log('[TerminalAPI] WebSocket já conectado, ignorando');
            return;
        }

        // Se já está tentando conectar, não iniciar outra conexão
        if (wsConnection && wsConnection.readyState === WebSocket.CONNECTING) {
            console.log('[TerminalAPI] WebSocket já está conectando, ignorando');
            return;
        }

        // Se não temos terminal ou namespace/pod, não podemos conectar
        if (!terminal || !initialNamespace || !initialPod) {
            console.log('[TerminalAPI] Sem terminal ou namespace/pod para conectar');
            return;
        }

        // Limpar conexão anterior, se existir
        if (wsConnection) {
            try {
                wsConnection.onclose = null;
                wsConnection.close();
            } catch (e) {
                console.error('[TerminalAPI] Erro ao fechar WebSocket:', e);
            }
            wsConnection = null;
        }

        // Iniciar nova conexão
        console.log('[TerminalAPI] Iniciando conexão WebSocket para', initialNamespace, initialPod);
        setStatus('connecting');

        if (terminal) {
            terminal.clear();
            terminal.writeln('\x1b[1;33mConectando ao terminal...\x1b[0m');
        }

        try {
            const wsUrl = api.getTerminalWebSocketUrl(initialNamespace, initialPod);
            console.log('[TerminalAPI] URL WebSocket:', wsUrl);

            const ws = new WebSocket(wsUrl);
            wsConnection = ws;

            // Configurar timeout prolongado para a conexão
            const connectionTimeout = setTimeout(() => {
                if (ws.readyState !== WebSocket.OPEN) {
                    console.log('[TerminalAPI] Timeout de conexão após 30 segundos');
                    ws.close();
                    if (terminal) {
                        terminal.writeln('\r\n\x1b[1;31mNão foi possível conectar ao terminal. Aguarde o pod estar pronto e clique em Reconectar.\x1b[0m');
                    }
                    setStatus('error');
                }
            }, RECONNECT_TIMEOUT);

            ws.onopen = () => {
                console.log('[TerminalAPI] WebSocket conectado com sucesso');
                clearTimeout(connectionTimeout);
                setStatus('connected');
                reconnectAttempts = 0;

                if (terminal) {
                    terminal.clear();
                    terminal.writeln('\x1b[1;32mConexão estabelecida. Bem-vindo ao laboratório!\x1b[0m\r\n');

                    // Configurar entrada do terminal
                    terminal.onData((data) => {
                        if (ws.readyState === WebSocket.OPEN) {
                            ws.send(data);
                        }
                    });

                    // Enviar tamanho do terminal
                    if (terminal.cols && terminal.rows && fitAddon) {
                        ws.send(JSON.stringify({
                            type: 'resize',
                            cols: terminal.cols,
                            rows: terminal.rows
                        }));
                    }
                }
            };

            ws.onmessage = (event) => {
                if (terminal) {
                    try {
                        terminal.write(event.data);
                    } catch (e) {
                        console.error('[TerminalAPI] Erro ao escrever no terminal:', e);
                    }
                }
            };

            ws.onerror = (event) => {
                console.error('[TerminalAPI] Erro no WebSocket:', event);
                clearTimeout(connectionTimeout);
                setStatus('error');
                if (terminal) {
                    terminal.writeln('\r\n\x1b[1;31mErro na conexão. Aguarde o pod estar pronto e clique em Reconectar.\x1b[0m');
                }
            };

            ws.onclose = (event) => {
                console.log('[TerminalAPI] WebSocket fechado:', {
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean
                });
                clearTimeout(connectionTimeout);
                setStatus('disconnected');
                wsConnection = null;

                if (terminal) {
                    terminal.writeln('\r\n\x1b[1;33mConexão encerrada. Aguarde alguns segundos...\x1b[0m');
                }
            };
        } catch (error) {
            console.error('[TerminalAPI] Erro ao criar WebSocket:', error);
            setStatus('error');
            if (terminal) {
                terminal.writeln('\r\n\x1b[1;31mErro ao criar conexão. Aguarde o pod estar pronto e clique em Reconectar.\x1b[0m');
            }
        }
    };

    // Agendar tentativa de reconexão com backoff exponencial
    const scheduleReconnect = () => {
        // Não tentar reconexão automática, deixar o usuário decidir quando reconectar
        console.log('[TerminalAPI] Aguardando reconexão manual');
    };

    // Limpar todos os recursos
    const cleanup = () => {
        // Cancelar qualquer tentativa de reconexão pendente
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
        }

        // Fechar conexão WebSocket
        if (wsConnection) {
            try {
                wsConnection.onclose = null;
                wsConnection.close();
            } catch (e) {
                console.error('[TerminalAPI] Erro ao fechar WebSocket na limpeza:', e);
            }
            wsConnection = null;
        }

        // Remover listener de resize
        if (resizeListener) {
            window.removeEventListener('resize', resizeListener);
            resizeListener = null;
        }

        // Descartar terminal
        if (terminal) {
            try {
                terminal.dispose();
            } catch (e) {
                console.error('[TerminalAPI] Erro ao descartar terminal:', e);
            }
            terminal = null;
        }

        // Limpar referências
        fitAddon = null;
        terminalElement = null;
        statusIndicator = null;
        reconnectButton = null;
        connectionStatus = 'disconnected';
        attemptedSetup = false;
    };

    // Registrar limpeza global
    window.addEventListener('beforeunload', cleanup);

    // Retornar API pública
    return {
        setupTerminal,
        connect,
        cleanup
    };
})();

// Componente React - Apenas um wrapper fino para a API imperativa
const Terminal = ({ namespace, pod }) => {
    const terminalRef = useRef(null);
    const initializedRef = useRef(false);

    // Efeito para configurar o terminal uma única vez
    useEffect(() => {
        if (!initializedRef.current && namespace && pod) {
            console.log('[Terminal React] Primeira montagem, configurando terminal');
            initializedRef.current = true;

            // Limpar qualquer terminal existente
            TerminalAPI.cleanup();

            if (terminalRef.current) {
                // Configurar terminal sem iniciar reconexões
                TerminalAPI.setupTerminal(terminalRef.current, namespace, pod);
            }

            // Configurar limpeza no desmonte
            return () => {
                initializedRef.current = false;
                TerminalAPI.cleanup();
            };
        }
    }, []); // Dependência vazia para executar apenas uma vez

    // Renderizar apenas o contêiner
    return (
        <div
            ref={terminalRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#1e1e1e'
            }}
        />
    );
};

export default Terminal; 