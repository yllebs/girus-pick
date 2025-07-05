import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Button,
    Grid,
    Box,
    Fade,
    Divider,
    Container
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SchoolIcon from '@material-ui/icons/School';
import TimerIcon from '@material-ui/icons/Timer';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ReplayIcon from '@material-ui/icons/Replay';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        textAlign: 'center',
        backgroundColor: '#1c1e22',
        minHeight: 'calc(100vh - 110px)',
    },
    container: {
        maxWidth: 900,
        margin: '0 auto',
    },
    paper: {
        padding: theme.spacing(6, 4),
        backgroundColor: '#2d323b',
        color: '#e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '4px solid #FF9900',
    },
    congratsHeader: {
        position: 'relative',
        marginBottom: theme.spacing(5),
    },
    iconContainer: {
        marginBottom: theme.spacing(3),
        position: 'relative',
    },
    icon: {
        fontSize: 80,
        color: '#4CAF50',
        animation: '$pulse 2s infinite',
    },
    trophy: {
        fontSize: 70,
        color: '#FFD700',
        position: 'absolute',
        top: -15,
        left: '50%',
        transform: 'translateX(-140%)',
        animation: '$float 3s ease-in-out infinite',
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(1.1)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
    '@keyframes float': {
        '0%': {
            transform: 'translateX(-140%) translateY(0px)',
        },
        '50%': {
            transform: 'translateX(-140%) translateY(-10px)',
        },
        '100%': {
            transform: 'translateX(-140%) translateY(0px)',
        },
    },
    title: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        color: '#fff',
        fontSize: '2.5rem',
    },
    subtitle: {
        color: '#b0b0b0',
        marginBottom: theme.spacing(4),
        fontSize: '1.2rem',
    },
    summaryBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: theme.spacing(4),
        borderRadius: '8px',
        marginBottom: theme.spacing(4),
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    labTitle: {
        color: '#FF9900',
        fontWeight: 600,
        marginBottom: theme.spacing(2),
    },
    message: {
        margin: theme.spacing(3, 0),
        lineHeight: 1.6,
    },
    statsContainer: {
        marginTop: theme.spacing(4),
    },
    statCard: {
        padding: theme.spacing(3),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    tasksStat: {
        borderLeft: '3px solid #FF9900',
    },
    stepsStat: {
        borderLeft: '3px solid #4CAF50',
    },
    statValue: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: theme.spacing(1),
    },
    statLabel: {
        color: '#b0b0b0',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    statIcon: {
        fontSize: 32,
        marginBottom: theme.spacing(1),
    },
    tasksIcon: {
        color: '#FF9900',
    },
    stepsIcon: {
        color: '#4CAF50',
    },
    sectionTitle: {
        fontWeight: 600,
        color: '#FF9900',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
            marginRight: theme.spacing(1),
        },
    },
    taskList: {
        marginBottom: theme.spacing(4),
    },
    taskItem: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
        '&:hover': {
            transform: 'translateX(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    taskIcon: {
        color: '#4CAF50',
        marginRight: theme.spacing(2),
        fontSize: '1.5rem',
    },
    taskName: {
        fontWeight: 500,
        color: '#e0e0e0',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
    button: {
        padding: theme.spacing(1.5, 4),
        borderRadius: '30px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'translateY(-3px)',
        },
        '& svg': {
            marginRight: theme.spacing(1),
        },
    },
    primaryButton: {
        backgroundColor: '#FF9900',
        color: '#000',
        '&:hover': {
            backgroundColor: '#e68a00',
        },
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
    },
    confetti: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        background: '#f00',
        borderRadius: '50%',
    },
}));

interface Task {
    name: string;
    description: string;
    steps: string[];
}

interface LabCompletionProps {
    templateId: string;
    tasks: Task[];
    onNewLab: () => void;
}

const LabCompletion: React.FC<LabCompletionProps> = ({ templateId, tasks, onNewLab }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleGoToLabs = () => {
        history.push('/labs');
    };

    const handleTryAgain = async () => {
        try {
            await api.post('/labs', { templateId });
            onNewLab();
        } catch (error) {
            console.error('Erro ao tentar reiniciar o laboratório:', error);
            alert('Erro ao tentar reiniciar o laboratório. Por favor, tente novamente.');
        }
    };

    // Calcular estatísticas do laboratório
    const totalSteps = tasks.reduce((total, task) => total + task.steps.length, 0);

    return (
        <Fade in={true} timeout={800}>
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Paper className={classes.paper}>
                        <div className={classes.congratsHeader}>
                            <div className={classes.iconContainer}>
                                <EmojiEventsIcon className={classes.trophy} />
                                <CheckCircleIcon className={classes.icon} />
                            </div>
                            <Typography variant="h3" className={classes.title}>
                                Parabéns!
                            </Typography>
                            <Typography variant="h6" className={classes.subtitle}>
                                Você completou o laboratório com sucesso!
                            </Typography>
                        </div>

                        <div className={classes.summaryBox}>
                            <Typography variant="h5" className={classes.labTitle}>
                                {templateId}
                            </Typography>
                            <Typography variant="body1" className={classes.message}>
                                Você finalizou com sucesso todas as tarefas deste laboratório.
                                Essa conquista demonstra seu domínio dos conceitos e habilidades práticas abordados.
                                Continue aprendendo e aprimorando seus conhecimentos!
                            </Typography>

                            <div className={classes.statsContainer}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Fade in={true} timeout={1000}>
                                            <div className={`${classes.statCard} ${classes.tasksStat}`}>
                                                <AssignmentTurnedInIcon className={`${classes.statIcon} ${classes.tasksIcon}`} />
                                                <Typography variant="h3" className={classes.statValue}>
                                                    {tasks.length}
                                                </Typography>
                                                <Typography variant="body2" className={classes.statLabel}>
                                                    Tarefas Completadas
                                                </Typography>
                                            </div>
                                        </Fade>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Fade in={true} timeout={1200}>
                                            <div className={`${classes.statCard} ${classes.stepsStat}`}>
                                                <TimerIcon className={`${classes.statIcon} ${classes.stepsIcon}`} />
                                                <Typography variant="h3" className={classes.statValue}>
                                                    {totalSteps}
                                                </Typography>
                                                <Typography variant="body2" className={classes.statLabel}>
                                                    Passos Concluídos
                                                </Typography>
                                            </div>
                                        </Fade>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                        <Typography variant="h6" className={classes.sectionTitle}>
                            <SchoolIcon />
                            Conhecimentos adquiridos
                        </Typography>

                        <div className={classes.taskList}>
                            {tasks.map((task, index) => (
                                <Fade key={index} in={true} timeout={800 + (index * 200)}>
                                    <div className={classes.taskItem}>
                                        <CheckCircleIcon className={classes.taskIcon} />
                                        <Typography variant="body1" className={classes.taskName}>
                                            {task.name}
                                        </Typography>
                                    </div>
                                </Fade>
                            ))}
                        </div>

                        <div className={classes.buttonContainer}>
                            <Button
                                variant="contained"
                                className={`${classes.button} ${classes.primaryButton}`}
                                onClick={handleTryAgain}
                            >
                                <ReplayIcon />
                                Tentar Novamente
                            </Button>
                            <Button
                                variant="contained"
                                className={`${classes.button} ${classes.secondaryButton}`}
                                onClick={handleGoToLabs}
                            >
                                <KeyboardBackspaceIcon />
                                Voltar para Laboratórios
                            </Button>
                        </div>
                    </Paper>
                </Container>
            </div>
        </Fade>
    );
};

export default LabCompletion; 