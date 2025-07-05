import React, { useState, useEffect } from 'react';
import {
    Snackbar,
    Button,
    Box,
    Typography,
    Paper,
    IconButton,
    Fade,
    makeStyles
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
    checkForUpdates,
    ReleaseInfo,
    getNotificationReshowHours,
    LS_KEYS
} from '../services/updates';

const useStyles = makeStyles((theme) => ({
    updateNotification: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        maxWidth: 400,
        zIndex: 2000,
    },
    paper: {
        backgroundColor: '#2d323b',
        borderRadius: '8px',
        padding: theme.spacing(2),
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        borderLeft: '4px solid #FF9900',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    icon: {
        color: '#FF9900',
        marginRight: theme.spacing(1),
        animation: '$pulse 2s infinite',
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
            opacity: 1,
        },
        '50%': {
            transform: 'scale(1.2)',
            opacity: 0.7,
        },
        '100%': {
            transform: 'scale(1)',
            opacity: 1,
        },
    },
    title: {
        color: '#e0e0e0',
        fontWeight: 600,
        flexGrow: 1,
    },
    content: {
        color: '#b0b0b0',
        marginBottom: theme.spacing(2),
    },
    version: {
        backgroundColor: 'rgba(255,153,0,0.15)',
        color: '#FF9900',
        padding: theme.spacing(0.5, 1),
        borderRadius: 4,
        fontWeight: 500,
        display: 'inline-block',
        marginLeft: theme.spacing(1),
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: theme.spacing(1),
    },
    updateButton: {
        backgroundColor: '#FF9900',
        color: '#000',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#e68a00',
        },
    },
    laterButton: {
        color: '#b0b0b0',
    }
}));

const UpdateNotification: React.FC = () => {
    const classes = useStyles();
    const [updateInfo, setUpdateInfo] = useState<ReleaseInfo | null>(null);
    const [open, setOpen] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [reshowHours, setReshowHours] = useState(getNotificationReshowHours());

    useEffect(() => {
        // Verificar atualizações ao carregar o componente
        const checkUpdates = async () => {
            // Atualizar o tempo de reexibição
            setReshowHours(getNotificationReshowHours());

            // Verificar se há uma atualização disponível
            const update = await checkForUpdates();

            if (update) {
                // Verificar se já mostramos esta notificação recentemente
                const lastCheck = localStorage.getItem(LS_KEYS.LAST_CHECK);
                const lastDismissedVersion = localStorage.getItem(LS_KEYS.DISMISSED_VERSION);
                const lastCheckDate = lastCheck ? new Date(lastCheck) : null;
                const now = new Date();

                // Decidir se deve mostrar a notificação com base em:
                // 1. Se é uma versão diferente da última dispensada (sempre mostrar versões novas)
                // 2. Se já passou o tempo definido desde a última vez que mostramos (mesmo que dispensada)
                const isNewVersion = update.version !== lastDismissedVersion;
                const timeElapsed = lastCheckDate ?
                    (now.getTime() - lastCheckDate.getTime()) / (1000 * 60 * 60) :
                    reshowHours + 1;

                if (isNewVersion || timeElapsed >= reshowHours) {
                    setUpdateInfo(update);
                    setOpen(true);
                    // Atualizar a data da última verificação
                    localStorage.setItem(LS_KEYS.LAST_CHECK, now.toISOString());
                }
            }
        };

        checkUpdates();

        // Verificar por atualizações a cada hora
        const interval = setInterval(checkUpdates, 3600000);
        return () => clearInterval(interval);
    }, [reshowHours]);

    const handleClose = () => {
        setOpen(false);
        // Salvar a versão que o usuário dispensou
        if (updateInfo) {
            localStorage.setItem(LS_KEYS.DISMISSED_VERSION, updateInfo.version);
        }
    };

    const handleLater = () => {
        // Salvar a data atual para determinar quando mostrar novamente
        localStorage.setItem(LS_KEYS.LAST_CHECK, new Date().toISOString());

        // Fechar o popup principal
        setOpen(false);

        // Mostrar uma mensagem de confirmação
        setShowSnackbar(true);
    };

    const handleOpenReleasePage = () => {
        if (updateInfo) {
            window.open(updateInfo.url, '_blank');
        }
    };

    if (!updateInfo) return null;

    return (
        <>
            <Fade in={open}>
                <Box className={classes.updateNotification}>
                    <Paper className={classes.paper}>
                        <Box className={classes.header}>
                            <UpdateIcon className={classes.icon} />
                            <Typography variant="h6" className={classes.title}>
                                Nova Versão Disponível
                            </Typography>
                            <IconButton size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" style={{ color: '#b0b0b0' }} />
                            </IconButton>
                        </Box>

                        <Typography variant="body2" className={classes.content}>
                            Uma nova versão do Girus-CLI está disponível!
                            <span className={classes.version}>v{updateInfo.version}</span>
                        </Typography>

                        <Box className={classes.buttonsContainer}>
                            <Button
                                className={classes.laterButton}
                                size="small"
                                onClick={handleLater}
                            >
                                Mais Tarde
                            </Button>
                            <Button
                                className={classes.updateButton}
                                size="small"
                                onClick={handleOpenReleasePage}
                                endIcon={<OpenInNewIcon />}
                            >
                                Ver Atualização
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Fade>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={5000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity="info">
                    Você será notificado novamente em {reshowHours} horas.
                </Alert>
            </Snackbar>
        </>
    );
};

export default UpdateNotification; 