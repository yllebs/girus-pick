import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, Tooltip, Snackbar } from '@material-ui/core';
import '../styles/linuxtips-theme.css';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#1c1e22',
        marginBottom: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        border: '1px solid #444',
    },
    terminalHeader: {
        backgroundColor: '#2d323b',
        padding: theme.spacing(1, 2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #444',
    },
    terminalTitle: {
        color: '#e0e0e0',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    terminalContent: {
        fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
        padding: theme.spacing(2),
        fontSize: '0.9rem',
        color: '#b0b0b0',
        overflowX: 'auto',
        position: 'relative',
    },
    promptSymbol: {
        color: '#FF9900',
        marginRight: theme.spacing(1),
    },
    command: {
        color: '#e0e0e0',
    },
    copyButton: {
        color: '#b0b0b0',
        padding: theme.spacing(0.5),
    },
    buttonContainer: {
        display: 'flex',
        gap: '8px',
    }
}));

interface TerminalCommandProps {
    command: string;
    output?: string;
    title?: string;
    showPrompt?: boolean;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({
    command,
    output,
    title = 'Terminal',
    showPrompt = true,
}) => {
    const classes = useStyles();
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setShowSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <Paper className={classes.root} elevation={2}>
            <div className={classes.terminalHeader}>
                <div className={classes.terminalTitle}>
                    <img
                        src="/assets/images/tux-logo.png"
                        alt="Terminal"
                        style={{ width: '18px', height: '18px' }}
                    />
                    {title}
                </div>
                <div className={classes.buttonContainer}>
                    <Tooltip title="Copiar comando">
                        <IconButton
                            aria-label="copiar"
                            className={classes.copyButton}
                            size="small"
                            onClick={handleCopy}
                        >
                            <span role="img" aria-label="copy">
                                📋
                            </span>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={classes.terminalContent}>
                {showPrompt && <span className={classes.promptSymbol}>$</span>}
                <span className={classes.command}>{command}</span>

                {output && (
                    <div style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>
                        {output}
                    </div>
                )}
            </div>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Comando copiado para a área de transferência!"
            />
        </Paper>
    );
};

export default TerminalCommand; 