import React, { useRef, useEffect, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Paper, Typography, makeStyles, Button, Box } from '@material-ui/core';
import 'xterm/css/xterm.css';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';

// Definição da interface para as props do componente
interface TerminalWindowProps {
    namespace: string;
    podName: string;
}

// Definição dos estilos
const useStyles = makeStyles((theme) => ({
    terminalContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#212530',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    terminalHeader: {
        padding: '8px 16px',
        borderBottom: '1px solid #3f4653',
        backgroundColor: '#2d323b',
    },
    terminalTitle: {
        fontWeight: 'bold',
        color: '#e0e0e0',
    },
    terminalScreen: {
        flexGrow: 1,
        padding: '8px',
        backgroundColor: '#212530',
        overflow: 'hidden',
    },
    actionButton: {
        borderRadius: '4px',
        textTransform: 'none',
    },
    errorMessage: {
        color: theme.palette.error.main,
        padding: '8px 16px',
    }
}));

const TerminalWindow: React.FC<TerminalWindowProps> = ({
    namespace,
    podName,
}) => {
    const classes = useStyles();
    const terminalRef = useRef<HTMLDivElement>(null);
    const [terminal, setTerminal] = useState<Terminal | null>(null);
    const [connected, setConnected] = useState(false);
    const [connectionError, setConnectionError] = useState('');
    const [wsConnected, setWsConnected] = useState(false);
    const history = useHistory();

    // Função para conectar ao terminal
    const connectTerminal = () => {
        // Implementação da conexão ao terminal
        setConnected(true);
    };

    return (
        <Paper className={classes.terminalContainer}>
            <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.terminalHeader}>
                <Typography variant="subtitle1" className={classes.terminalTitle}>
                    Terminal
                </Typography>
                <Box>
                    {!connected && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={connectTerminal}
                            className={classes.actionButton}
                        >
                            Conectar
                        </Button>
                    )}
                </Box>
            </Box>
            <div
                ref={terminalRef}
                className={classes.terminalScreen}
            />
            {connectionError && (
                <Typography variant="body2" className={classes.errorMessage}>
                    {connectionError}
                </Typography>
            )}
        </Paper>
    );
};

export default TerminalWindow; 