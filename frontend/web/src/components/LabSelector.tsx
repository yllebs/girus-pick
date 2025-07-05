import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    CircularProgress,
    Snackbar,
    Container,
    Box,
    Paper,
    Chip,
    Button,
    Fade,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { api } from '../services/api';
import '../styles/linuxtips-theme.css';

// Importar imagens diretamente
import kubernetesLogo from '../assets/images/kubernetes-logo.png';
import tuxLogo from '../assets/images/tux-logo.png';
import dockerLogo from '../assets/images/docker-logo.png';
// Importar ícones
import TimerIcon from '@material-ui/icons/Timer';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import BuildIcon from '@material-ui/icons/Build';
import MemoryIcon from '@material-ui/icons/Memory';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: '#1c1e22',
        minHeight: 'calc(100vh - 110px)',
    },
    header: {
        marginBottom: theme.spacing(4),
    },
    title: {
        color: '#e0e0e0',
        fontWeight: 700,
        fontSize: '2.5rem',
        marginBottom: theme.spacing(1),
    },
    subtitle: {
        color: '#b0b0b0',
        marginBottom: theme.spacing(2),
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    },
    error: {
        padding: theme.spacing(3),
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing(3),
    },
    labCard: {
        backgroundColor: '#2d323b',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        borderLeft: '4px solid #FF9900',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.25)',
        },
    },
    kubernetesCard: {
        borderLeft: '4px solid #326CE5',
    },
    dockerCard: {
        borderLeft: '4px solid #007bff',
    },
    linuxCard: {
        borderLeft: '4px solid #ff0000',
    },
    cardHeader: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(0),
        display: 'flex',
        alignItems: 'center',
    },
    cardIcon: {
        width: '40px',
        height: '40px',
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: '50%',
        backgroundColor: 'rgba(255,153,0,0.1)',
    },
    k8sIcon: {
        backgroundColor: 'rgba(50,108,229,0.1)',
    },
    dockerIcon: {
        backgroundColor: 'rgba(0,123,255,0.1)',
    },
    linuxIcon: {
        backgroundColor: 'rgba(255,0,0,0.1)',
    },
    cardTitle: {
        fontWeight: 600,
        color: '#e0e0e0',
        fontSize: '1.5rem',
        flexGrow: 1,
    },
    cardContent: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1),
        flexGrow: 1,
    },
    cardDescription: {
        color: '#b0b0b0',
        marginBottom: theme.spacing(2),
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    metadataContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    metadataItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: theme.spacing(0.5, 1),
        borderRadius: '4px',
    },
    metadataIcon: {
        color: '#fdc43f',
        marginRight: theme.spacing(1),
        fontSize: '1.1rem',
    },
    metadataText: {
        color: '#e0e0e0',
        fontSize: '0.9rem',
    },
    cardActions: {
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(255,255,255,0.05)',
    },
    chip: {
        backgroundColor: 'rgba(255,153,0,0.15)',
        color: '#FF9900',
        fontWeight: 500,
        margin: theme.spacing(0.5),
    },
    kubernetesChip: {
        backgroundColor: 'rgba(50,108,229,0.15)',
        color: '#326CE5',
    },
    linuxChip: {
        backgroundColor: 'rgba(255,0,0,0.15)',
        color: '#ff0000',
    },
    dockerChip: {
        backgroundColor: 'rgba(0,123,255,0.15)',
        color: '#007bff',
    },
    startButton: {
        backgroundColor: '#FF9900',
        color: '#000',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#e68a00',
        },
        width: '100%',
        padding: theme.spacing(1),
        fontSize: '1rem',
    },
    startButtonK8s: {
        backgroundColor: '#326CE5',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#2857b9',
        },
    },
    startButtonDocker: {
        backgroundColor: '#007bff',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
    startButtonLinux: {
        backgroundColor: '#ff0000',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#cc0000',
        },
    },
    errorContainer: {
        backgroundColor: '#2d323b',
        borderRadius: '8px',
        padding: theme.spacing(3),
        marginTop: theme.spacing(4),
        borderLeft: '4px solid #f44336',
    },
    emptyContainer: {
        backgroundColor: '#2d323b',
        borderRadius: '8px',
        padding: theme.spacing(3),
        marginTop: theme.spacing(4),
        borderLeft: '4px solid #fdc43f',
        textAlign: 'center',
    },
    filterSection: {
        marginBottom: theme.spacing(4),
    },
    filterChip: {
        margin: theme.spacing(0.5),
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: '#e0e0e0',
        '&.Mui-selected': {
            backgroundColor: 'rgba(253, 196, 63, 0.2)',
            color: '#fdc43f',
        },
    },
    challengeCard: {
        borderLeft: '4px solid #FF5722',
    },
    challengeIcon: {
        backgroundColor: 'rgba(255,87,34,0.1)',
    },
    startButtonChallenge: {
        backgroundColor: '#FF5722',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#E64A19',
        },
    },
    challengeChip: {
        backgroundColor: 'rgba(255,87,34,0.15)',
        color: '#FF5722',
    },
    timerIcon: {
        color: '#FF5722',
        marginRight: theme.spacing(1),
        fontSize: '1.1rem',
    },
}));

interface Template {
    name: string;
    title: string;
    description: string;
    duration: string;
    tasks: any[];
    youtubeVideo?: string;
    timerEnabled: boolean;
}

interface LabSelectorProps {
    onSelectLab: (template: string) => void;
}

const LabSelector: React.FC<LabSelectorProps> = ({ onSelectLab }) => {
    const classes = useStyles();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creatingLabId, setCreatingLabId] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [filterType, setFilterType] = useState<'all' | 'kubernetes' | 'linux' | 'docker' | 'terraform' | 'cloud' | 'challenge'>('all');

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const response = await api.get('/templates');
                setTemplates(response.data.templates || []);
                setError(null);
            } catch (err) {
                setError('Não foi possível carregar os templates disponíveis');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    // Verificar se o laboratório foi acessado a partir do filtro de desafios
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const filter = searchParams.get('filter');
        if (filter === 'challenges') {
            setFilterType('challenge');
        }
    }, []);

    const handleSelectLab = async (templateName: string) => {
        try {
            setCreatingLabId(templateName);
            setSnackbarMessage('Criando laboratório, por favor aguarde...');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            const response = await api.post('/labs', { templateId: templateName });
            console.log('Laboratório criado com sucesso:', response.data);

            setSnackbarMessage('Laboratório criado com sucesso!');
            setSnackbarOpen(true);

            onSelectLab(templateName);
        } catch (error) {
            console.error('Erro ao criar laboratório:', error);
            setSnackbarMessage('Erro ao criar laboratório. Tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setCreatingLabId(null);
        }
    };

    const isKubernetesTemplate = (name: string, description: string): boolean => {
        const lowerName = name.toLowerCase();
        const lowerDesc = description.toLowerCase();
        return lowerName.includes('kubernetes') ||
            lowerName.includes('k8s') ||
            lowerDesc.includes('kubernetes') ||
            lowerDesc.includes('k8s');
    };

    const isDockerTemplate = (name: string, description: string): boolean => {
        return (
            name.toLowerCase().includes('docker') ||
            description.toLowerCase().includes('docker')
        );
    };

    const isTerraformTemplate = (name: string, description: string): boolean => {
        const lowerName = name.toLowerCase();
        const lowerDesc = description.toLowerCase();
        return lowerName.includes('terraform') ||
            lowerDesc.includes('terraform') ||
            lowerDesc.includes('iac');
    };

    const isCloudTemplate = (name: string, description: string): boolean => {
        const lowerName = name.toLowerCase();
        const lowerDesc = description.toLowerCase();
        return lowerName.includes('cloud') ||
            lowerName.includes('aws') ||
            lowerName.includes('azure') ||
            lowerName.includes('gcp') ||
            lowerDesc.includes('cloud') ||
            lowerDesc.includes('aws') ||
            lowerDesc.includes('azure') ||
            lowerDesc.includes('gcp');
    };

    const isChallengeTemplate = (template: Template): boolean => {
        return template.timerEnabled === true;
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Filtrar laboratórios por tipo
    const filteredTemplates = templates.filter(template => {
        const isK8s = isKubernetesTemplate(template.name, template.description);
        const isDocker = isDockerTemplate(template.name, template.description);
        const isTerraform = isTerraformTemplate(template.name, template.description);
        const isCloud = isCloudTemplate(template.name, template.description);
        const isChallenge = isChallengeTemplate(template);

        if (filterType === 'all') return true;
        if (filterType === 'kubernetes') return isK8s;
        if (filterType === 'linux') return !isK8s && !isDocker && !isTerraform && !isCloud && !isChallenge;
        if (filterType === 'docker') return isDocker;
        if (filterType === 'terraform') return isTerraform;
        if (filterType === 'cloud') return isCloud;
        if (filterType === 'challenge') return isChallenge;
        return true;
    });

    if (loading) {
        return (
            <Container maxWidth="lg" className={classes.root}>
                <div className={classes.loading}>
                    <CircularProgress style={{ color: '#FF9900' }} size={60} thickness={4} />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" className={classes.root}>
                <Box className={classes.errorContainer}>
                    <Typography variant="h5" gutterBottom style={{ color: '#f44336' }}>
                        Erro ao carregar laboratórios
                    </Typography>
                    <Typography variant="body1">
                        {error}
                    </Typography>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.location.reload()}
                        >
                            Tentar Novamente
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Box className={classes.header}>
                <Typography variant="h3" className={classes.title}>
                    Selecione um Laboratório
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Escolha um dos laboratórios abaixo para iniciar seu aprendizado prático
                </Typography>

                {/* Filtros */}
                <Box className={classes.filterSection}>
                    <Typography variant="subtitle1" gutterBottom style={{ color: '#fdc43f' }}>
                        Filtrar por tipo:
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        <Chip
                            label="Todos"
                            onClick={() => setFilterType('all')}
                            className={classes.filterChip}
                            color={filterType === 'all' ? 'primary' : 'default'}
                        />
                        <Chip
                            label="Kubernetes"
                            onClick={() => setFilterType('kubernetes')}
                            className={classes.filterChip}
                            color={filterType === 'kubernetes' ? 'primary' : 'default'}
                        />
                        <Chip
                            label="Linux"
                            onClick={() => setFilterType('linux')}
                            className={classes.filterChip}
                            color={filterType === 'linux' ? 'primary' : 'default'}
                        />
                        <Chip
                            label="Docker"
                            onClick={() => setFilterType('docker')}
                            className={classes.filterChip}
                            color={filterType === 'docker' ? 'primary' : 'default'}
                        />
                        <Chip
                            label="Terraform"
                            onClick={() => setFilterType('terraform')}
                            className={classes.filterChip}
                            color={filterType === 'terraform' ? 'primary' : 'default'}
                        />
                        <Chip
                            label="Cloud"
                            onClick={() => setFilterType('cloud')}
                            className={classes.filterChip}
                            color={filterType === 'cloud' ? 'primary' : 'default'}
                        />
                        <Chip
                            label="Desafio"
                            onClick={() => setFilterType('challenge')}
                            className={classes.filterChip}
                            color={filterType === 'challenge' ? 'primary' : 'default'}
                        />
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={4}>
                {filteredTemplates.map((template, index) => {
                    const isK8s = isKubernetesTemplate(template.name, template.description);
                    const isDocker = isDockerTemplate(template.name, template.description);
                    const isTerraform = isTerraformTemplate(template.name, template.description);
                    const isCloud = isCloudTemplate(template.name, template.description);
                    const isChallenge = isChallengeTemplate(template);
                    const isCreating = creatingLabId === template.name;

                    return (
                        <Grid item key={template.name} xs={12} md={6}>
                            <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                <Paper
                                    className={`${classes.labCard} ${isK8s ? classes.kubernetesCard :
                                        isDocker ? classes.dockerCard :
                                            isChallenge ? classes.challengeCard :
                                                classes.linuxCard
                                        }`}
                                    elevation={3}
                                >
                                    <Box className={classes.cardHeader}>
                                        <div
                                            className={`${classes.cardIcon} ${isKubernetesTemplate(template.name, template.description)
                                                ? classes.k8sIcon
                                                : isDockerTemplate(template.name, template.description)
                                                    ? classes.dockerIcon
                                                    : isChallenge
                                                        ? classes.challengeIcon
                                                        : classes.linuxIcon
                                                }`}
                                        >
                                            {isKubernetesTemplate(template.name, template.description) ? (
                                                <img
                                                    src={kubernetesLogo}
                                                    alt="Kubernetes Logo"
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            ) : isDockerTemplate(template.name, template.description) ? (
                                                <img
                                                    src={dockerLogo}
                                                    alt="Docker Logo"
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            ) : isChallenge ? (
                                                <EmojiEventsIcon style={{ width: '100%', height: '100%', color: '#FF5722' }} />
                                            ) : (
                                                <img
                                                    src={tuxLogo}
                                                    alt="Linux Logo"
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            )}
                                        </div>
                                        <Typography variant="h5" className={classes.cardTitle}>
                                            {template.title}
                                        </Typography>
                                    </Box>

                                    <Box className={classes.cardContent}>
                                        <Typography className={classes.cardDescription}>
                                            {template.description}
                                        </Typography>

                                        <Box className={classes.metadataContainer}>
                                            <Box className={classes.metadataItem}>
                                                <TimerIcon className={classes.metadataIcon} />
                                                <Typography className={classes.metadataText}>
                                                    Duração: {template.duration || 'N/A'}
                                                </Typography>
                                            </Box>

                                            <Box className={classes.metadataItem}>
                                                <ListAltIcon className={classes.metadataIcon} />
                                                <Typography className={classes.metadataText}>
                                                    Tarefas: {template.tasks?.length || 0}
                                                </Typography>
                                            </Box>

                                            <Box className={classes.metadataItem}>
                                                {isK8s ? (
                                                    <MemoryIcon className={classes.metadataIcon} />
                                                ) : isDocker ? (
                                                    <BuildIcon className={classes.metadataIcon} style={{ color: '#007bff' }} />
                                                ) : (
                                                    <BuildIcon className={classes.metadataIcon} style={{ color: '#ff0000' }} />
                                                )}
                                                <Typography className={classes.metadataText}>
                                                    {isK8s ? 'Kubernetes' :
                                                        isDocker ? 'Docker' :
                                                            isTerraform ? 'Terraform' :
                                                                isCloud ? 'Cloud' : 'Linux'}
                                                </Typography>
                                            </Box>

                                            {template.youtubeVideo && (
                                                <Box className={classes.metadataItem}>
                                                    <VideoLibraryIcon className={classes.metadataIcon} style={{ color: '#ff0000' }} />
                                                    <Typography className={classes.metadataText}>
                                                        Vídeo
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>

                                        <Box mt={2} display="flex" flexWrap="wrap">
                                            {isKubernetesTemplate(template.name, template.description) && (
                                                <Chip
                                                    label="Kubernetes"
                                                    className={`${classes.chip} ${classes.kubernetesChip}`}
                                                />
                                            )}
                                            {isDockerTemplate(template.name, template.description) && (
                                                <Chip
                                                    label="Docker"
                                                    className={`${classes.chip} ${classes.dockerChip}`}
                                                />
                                            )}
                                            {!isKubernetesTemplate(template.name, template.description) &&
                                                !isDockerTemplate(template.name, template.description) &&
                                                !isChallenge && (
                                                    <Chip
                                                        label="Linux"
                                                        className={`${classes.chip} ${classes.linuxChip}`}
                                                    />
                                                )}
                                            {isChallenge && (
                                                <Chip
                                                    icon={<TimerIcon />}
                                                    label="Desafio com Timer"
                                                    className={`${classes.chip} ${classes.challengeChip}`}
                                                />
                                            )}
                                        </Box>
                                    </Box>

                                    <Box className={classes.cardActions}>
                                        <Button
                                            className={`${classes.startButton} ${isKubernetesTemplate(template.name, template.description)
                                                ? classes.startButtonK8s
                                                : isDockerTemplate(template.name, template.description)
                                                    ? classes.startButtonDocker
                                                    : isChallenge
                                                        ? classes.startButtonChallenge
                                                        : classes.startButtonLinux
                                                }`}
                                            onClick={() => handleSelectLab(template.name)}
                                            disabled={isCreating}
                                            startIcon={<PlayArrowIcon />}
                                        >
                                            {isCreating ? 'Criando laboratório...' : 'Iniciar Laboratório'}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Fade>
                        </Grid>
                    );
                })}

                {templates.length > 0 && filteredTemplates.length === 0 && (
                    <Grid item xs={12}>
                        <Box className={classes.emptyContainer}>
                            <Typography variant="h5" gutterBottom>
                                Nenhum laboratório encontrado
                            </Typography>
                            <Typography variant="body1">
                                Não encontramos laboratórios com o filtro selecionado. Por favor, tente outro filtro.
                            </Typography>
                        </Box>
                    </Grid>
                )}

                {templates.length === 0 && (
                    <Grid item xs={12}>
                        <Box className={classes.emptyContainer}>
                            <Typography variant="h5" gutterBottom>
                                Nenhum laboratório disponível
                            </Typography>
                            <Typography variant="body1">
                                No momento não há laboratórios disponíveis. Por favor, tente novamente mais tarde.
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default LabSelector; 