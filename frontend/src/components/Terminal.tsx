import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { AttachAddon } from 'xterm-addon-attach';
import 'xterm/css/xterm.css';

interface LabTerminalProps {
    podName: string;
    namespace: string;
}

const LabTerminal: React.FC<LabTerminalProps> = ({ podName, namespace }) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminalInstance = useRef<Terminal | null>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        const term = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: 'monospace',
            theme: {
                background: '#1e1e1e',
            },
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.loadAddon(new WebLinksAddon());

        term.open(terminalRef.current);
        fitAddon.fit();

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(
            `${protocol}//${window.location.host}/api/v1/terminal/${namespace}/${podName}`
        );

        const attachAddon = new AttachAddon(ws);
        term.loadAddon(attachAddon);

        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        terminalInstance.current = term;

        return () => {
            term.dispose();
            ws.close();
            window.removeEventListener('resize', handleResize);
        };
    }, [podName, namespace]);

    return (
        <div style={{ height: '100%', padding: '1rem' }}>
            <div ref={terminalRef} style={{ height: '100%' }} />
        </div>
    );
};

export default LabTerminal;
