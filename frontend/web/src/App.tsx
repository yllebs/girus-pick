import React, { useState, useEffect } from 'react';
import LabWorkspace from './components/LabWorkspace';
import LabSelector from './components/LabSelector';
import UpdateNotification from './components/UpdateNotification';
import DemoPage from './pages/DemoPage';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BrowserRouter as Router, Route, Switch, Link, useLocation, useParams, useHistory } from 'react-router-dom';
import './styles/linuxtips-theme.css';
import { api } from './services/api';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '0',
    },
    title: {
        flexGrow: 1,
        fontSize: '1.8rem'
    },
    content: {
        marginTop: theme.spacing(0),
    },
    appBar: {
        backgroundColor: '#1c1e22',
        borderBottom: '3px solid #FF9900',
    },
    toolbar: {
        minHeight: 110,
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    toolbarLogos: {
        display: 'flex',
        alignItems: 'center',
    },
    leftLogo: {
        height: 120,
        marginRight: 12,
        padding: '6px 0'
    },
    rightLogo: {
        height: 100,
        padding: '6px 0'
    },
    exitButton: {
        backgroundColor: '#d32f2f',
        color: 'white',
        '&:hover': {
            backgroundColor: '#b71c1c',
        },
        marginRight: '16px'
    },
    navButtons: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0'
    }
}));

// Custom dark theme with LINUXtips colors
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fdc43f', // LINUXtips yellow
        },
        secondary: {
            main: '#326CE5', // Kubernetes blue
        },
        background: {
            default: '#1c1e22',
            paper: '#2d323b',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#b0b0b0',
        },
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#1c1e22',
                borderBottom: '3px solid #fdc43f',
            },
        },
        MuiButton: {
            root: {
                borderRadius: '4px',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '8px 16px',
                fontSize: '0.875rem',
            },
            outlined: {
                borderColor: '#fdc43f',
                color: '#fdc43f',
                '&:hover': {
                    backgroundColor: 'rgba(253, 196, 63, 0.08)',
                },
            },
            containedPrimary: {
                backgroundColor: '#fdc43f',
                color: '#000000',
                '&:hover': {
                    backgroundColor: '#e3b037',
                },
            },
        },
    },
});

// Componente específico para exibir um laboratório baseado no parâmetro da URL
const LabRoute: React.FC = () => {
    const { templateId } = useParams<{ templateId: string }>();
    const history = useHistory();
    const [confirmExitOpen, setConfirmExitOpen] = useState(false);

    const handleExitConfirmation = () => {
        setConfirmExitOpen(true);
    };

    const handleCancelExit = () => {
        setConfirmExitOpen(false);
    };

    const handleConfirmExit = async () => {
        setConfirmExitOpen(false);
        try {
            // Excluir o laboratório atual
            await api.delete('/labs/current').catch(error => {
                console.warn('Aviso ao sair do laboratório:', error);
                // Continuar mesmo com erro
            });

            // Redirecionar para a lista de laboratórios
            history.push('/');
        } catch (error) {
            console.error('Erro ao sair do laboratório:', error);
            // Redirecionar mesmo com erro
            history.push('/');
        }
    };

    return (
        <>
            <LabWorkspace templateId={templateId} onExit={handleExitConfirmation} />

            {/* Diálogo de confirmação */}
            <Dialog
                open={confirmExitOpen}
                onClose={handleCancelExit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sair do Laboratório?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você tem certeza que deseja sair deste laboratório?
                        Todos os recursos serão removidos e seu progresso será perdido.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelExit} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmExit} color="secondary" autoFocus>
                        Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// Componente para o seletor de laboratórios que recebe history via props
const LabSelectorWithNavigation: React.FC = () => {
    const history = useHistory();

    const handleSelectLab = (templateName: string) => {
        // Redirecionamento para a página específica do laboratório
        history.push(`/lab/${templateName}`);
    };

    return <LabSelector onSelectLab={handleSelectLab} />;
};

// Componente de layout principal que inclui a AppBar e conteúdo
const AppLayout: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const currentPath = location.pathname;

    // Verifica se o usuário está visualizando um laboratório
    const isViewingLab = currentPath.includes('/lab/');

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarLogos}>
                        <img
                            src="assets/images/girus-logo-beta-transparente-com-linuxtips.png"
                            alt="Girus"
                            className={classes.leftLogo}
                        />
                    </div>

                    {!isViewingLab && (
                        <Box className={classes.navButtons}>
                            <Button
                                color="primary"
                                component={Link}
                                to="/"
                                variant={currentPath === "/" ? "contained" : "outlined"}
                                style={{ margin: '0 8px' }}
                            >
                                SOBRE A PLATAFORMA
                            </Button>
                            <Button
                                color="primary"
                                component={Link}
                                to="/labs"
                                variant={currentPath.startsWith("/labs") ? "contained" : "outlined"}
                                style={{ margin: '0 8px' }}
                            >
                                LABORATÓRIOS
                            </Button>
                            <Button
                                color="primary"
                                component="a"
                                href="https://linuxtips.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                style={{ margin: '0 8px' }}
                            >
                                SITE DA LINUXtips
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                <Switch>
                    <Route path="/labs">
                        <LabSelectorWithNavigation />
                    </Route>
                    <Route path="/lab/:templateId">
                        <LabRoute />
                    </Route>
                    <Route path="/" exact>
                        <DemoPage />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppLayout />
                <UpdateNotification />
            </Router>
        </ThemeProvider>
    );
};

export default App;
