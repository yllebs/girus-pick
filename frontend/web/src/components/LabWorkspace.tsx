import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Grid,
    Button,
    Snackbar,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    LinearProgress,
    Fab,
    Box,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    AppBar,
    Toolbar,
    Tooltip,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { green, orange, red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';
import Terminal from './Terminal';
import LabCompletion from './LabCompletion';
import TutorialGuide from './TutorialGuide';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import '../styles/linuxtips-theme.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import 'prismjs/themes/prism-tomorrow.css';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LinuxTip from './LinuxTip';
import CodeIcon from '@material-ui/icons/Code';
import TimerIcon from '@material-ui/icons/Timer';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { marked } from 'marked';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        position: 'relative',
        backgroundColor: '#1c1e22',
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: '#2d323b',
        color: '#ffffff',
        height: '100%',
        borderLeft: '4px solid #fdc43f',
    },
    title: {
        marginBottom: theme.spacing(2),
        color: '#ffffff',
        fontWeight: 600,
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'clip',
        maxWidth: 'unset',
    },
    verifyButton: {
        marginTop: '8px',
        backgroundColor: '#FF9900',
        color: '#000',
        fontWeight: 600,
        padding: '10px 24px',
        '&:hover': {
            backgroundColor: '#e68a00',
        },
    },
    terminal: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '4px',
        border: '1px solid #444',
    },
    exitButton: {
        backgroundColor: '#d32f2f',
        color: 'white',
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#b71c1c',
        },
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4),
        backgroundColor: '#2d323b',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        marginTop: theme.spacing(4),
        maxWidth: '800px',
        margin: '0 auto',
    },
    loadingTitle: {
        marginBottom: theme.spacing(3),
        color: '#f0f0f0',
    },
    loadingStep: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    loadingProgress: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    statusIcon: {
        marginRight: theme.spacing(1),
        verticalAlign: 'middle',
    },
    successIcon: {
        color: green[500],
    },
    warningIcon: {
        color: orange[500],
    },
    errorIcon: {
        color: red[500],
    },
    statusMessage: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: theme.shape.borderRadius,
        fontFamily: 'monospace',
        width: '100%',
        maxHeight: '150px',
        overflowY: 'auto',
    },
    helpButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        zIndex: 1000,
    },
    appBar: {
        backgroundColor: '#1c1e22',
        boxShadow: 'none',
        borderBottom: 'none',
    },
    toolbar: {
        justifyContent: 'space-between',
        minHeight: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    labSection: {
        paddingTop: theme.spacing(3),
    },
    taskContainer: {
        padding: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    taskHeader: {
        backgroundColor: '#303540',
        padding: theme.spacing(2),
        borderRadius: '4px',
        marginBottom: theme.spacing(2),
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    progressContainer: {
        marginBottom: theme.spacing(2),
    },
    taskProgressInfo: {
        fontSize: '0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
    },
    tipContainer: {
        backgroundColor: '#1e2230',
        padding: theme.spacing(1),
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'flex-start',
        fontSize: '0.8rem',
        marginBottom: theme.spacing(2),
    },
    tipImage: {
        marginRight: theme.spacing(1),
        width: '28px',
        height: '28px',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3),
        '& .MuiButton-root': {
            fontSize: '0.8rem',
            padding: '4px 10px',
            minWidth: '120px'
        }
    },
    commandBlock: {
        backgroundColor: '#1a1d24',
        border: '1px solid #444',
        borderRadius: '4px',
        padding: theme.spacing(1),
        fontFamily: 'monospace',
        position: 'relative',
        marginBottom: theme.spacing(2),
        whiteSpace: 'pre-wrap',
        fontSize: '0.9rem',
        color: '#15e8ff',
    },
    copyButton: {
        position: 'absolute',
        top: '4px',
        right: '4px',
        padding: '2px',
        minWidth: 'unset',
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#ccc',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    },
    terminalAndTasksContainer: {
        display: 'flex',
        height: 'calc((100vh - 180px) * 1.2)',
        gap: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    terminalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        minWidth: '600px',
        maxHeight: 'calc((100vh - 180px) * 1.2)',
    },
    tasksContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        minWidth: '320px',
        maxWidth: '500px',
        maxHeight: 'calc((100vh - 180px) * 1.2)',
    },
    terminalWrapper: {
        flex: 1,
        height: '100%',
        minHeight: '300px',
        overflow: 'hidden',
    },
    terminalHeader: {
        backgroundColor: '#303540',
        padding: theme.spacing(1, 2),
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    },
    terminalIcon: {
        marginRight: theme.spacing(1),
        fontSize: '1.2rem',
        color: '#90caf9',
    },
    badge: {
        backgroundColor: '#4caf50',
        color: 'white',
        borderRadius: '12px',
        padding: '2px 8px',
        fontSize: '0.75rem',
        marginLeft: theme.spacing(1),
    },
    stepNumber: {
        backgroundColor: '#fdc43f',
        color: '#000',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),
        fontWeight: 'bold',
    },
    taskTitle: {
        color: '#ffffff',
        fontWeight: 600,
        marginBottom: theme.spacing(1),
    },
    taskDescription: {
        color: '#ffffff',
        marginBottom: theme.spacing(2),
        lineHeight: 1.6,
    },
    taskStep: {
        fontSize: '0.85rem',
        lineHeight: 1.4,
        marginBottom: theme.spacing(1),
    },
    videoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
    },
    videoContainerMaximized: {
        position: 'fixed',
        top: '80px',
        left: '0',
        width: '100%',
        height: 'calc(100vh - 80px)',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    header: {
        backgroundColor: '#303540',
        padding: theme.spacing(2),
        borderRadius: '4px',
        marginBottom: theme.spacing(2),
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 'auto',
        flexShrink: 0
    },
    headerLeft: {
        flex: 1,
        marginRight: theme.spacing(2),
        overflow: 'hidden',
        minWidth: '200px',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0
    },
    headerTitle: {
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#fdc43f'
    },
    timerChip: {
        marginRight: theme.spacing(2),
        fontWeight: 600,
        fontSize: '1rem',
        '& .MuiChip-label': {
            padding: '0 10px',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '1.2rem',
        },
        '&.critical': {
            animation: '$pulse 1s infinite',
            backgroundColor: 'rgba(255, 0, 0, 0.15)',
            '& .MuiChip-outlinedSecondary': {
                color: '#ff0000',
                borderColor: '#ff0000',
                fontWeight: 700,
            },
            '& .MuiChip-icon': {
                color: '#ff0000',
            }
        },
    },
    '@keyframes pulse': {
        '0%': {
            boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.7)',
        },
        '70%': {
            boxShadow: '0 0 0 15px rgba(255, 0, 0, 0)',
        },
        '100%': {
            boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)',
        },
    },
}));

interface Task {
    name: string;
    description: string;
    steps: string[];
    tips?: {
        title: string;
        type?: 'tip' | 'info' | 'warning' | 'danger';
        content: string
    }[];
    validation?: {
        command: string;
        expectedOutput?: string;
        errorMessage?: string;
    }[];
}

interface LabInfo {
    namespace: string;
    podName: string;
    templateId: string;
    status: string;
    allContainersReady: boolean;
    containersStatus: ContainerStatus[];
    creationTimestamp: string;
    youtubeVideo?: string;
    timerEnabled?: boolean;
    startTime?: string;
    expirationTime?: string;
    remainingTime?: number;
}

interface ContainerStatus {
    name: string;
    ready: boolean;
    state: string;
    reason: string;
    startedAt: string;
    restarts: number;
}

interface LabWorkspaceProps {
    templateId: string;
    onExit?: () => void;
}

// Função específica para processar listas de passos (steps)
const renderStep = (step: string, index: number, classes: ReturnType<typeof useStyles>): React.ReactNode => {
    // Se o passo contém um comando com acentos graves, extraí-lo
    const commandMatch = step.match(/`([^`]+)`/);
    if (commandMatch) {
        const command = commandMatch[1];
        return renderCommandBlock(command, index, classes);
    }

    // Verificar se é um bloco de código YAML
    if (step.includes('```yaml') || step.includes('```yml')) {
        const yamlMatch = step.match(/```(?:yaml|yml)([\s\S]*?)```/);
        if (yamlMatch) {
            const yamlContent = yamlMatch[1].trim();
            const highlightedYaml = Prism.highlight(yamlContent, Prism.languages.yaml, 'yaml');

            // Texto antes e depois do YAML
            const beforeYaml = step.substring(0, step.indexOf('```')).trim();
            const afterYaml = step.substring(step.indexOf('```', step.indexOf('```') + 3) + 3).trim();

            return (
                <div key={index} className={classes.taskStep}>
                    {beforeYaml && <div dangerouslySetInnerHTML={{ __html: marked(beforeYaml) }} />}
                    <div className="yaml-code-block">
                        <pre style={{ fontSize: '0.85rem' }}>
                            <code dangerouslySetInnerHTML={{ __html: highlightedYaml }} />
                        </pre>
                    </div>
                    {afterYaml && <div dangerouslySetInnerHTML={{ __html: marked(afterYaml) }} />}
                </div>
            );
        }
    }

    // Passo normal - Usar marked para renderizar Markdown
    return (
        <div key={index} className={classes.taskStep}>
            <div dangerouslySetInnerHTML={{ __html: marked(step) }} />
        </div>
    );
};

// Função para renderizar o conteúdo com formatação de YAML
const formatTaskContent = (content: string) => {
    // Verifica se há blocos de YAML
    if (!content) return '';

    // Regex para detectar blocos YAML
    const yamlBlockRegex = /(```yaml\n[\s\S]*?```|```yml\n[\s\S]*?```)/g;

    if (yamlBlockRegex.test(content)) {
        // Se tiver blocos de YAML, dividir o conteúdo e processar cada parte
        const parts = content.split(yamlBlockRegex);

        return parts.map((part, index) => {
            if (part.startsWith('```yaml\n') || part.startsWith('```yml\n')) {
                // Extrair o código YAML removendo os delimitadores
                const code = part.replace(/```(yaml|yml)\n/, '').replace(/```$/, '');
                // Formatar o YAML com o Prism.js
                const highlightedCode = Prism.highlight(code, Prism.languages.yaml, 'yaml');

                return (
                    <div key={index} className="yaml-code-block">
                        <pre>
                            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                        </pre>
                    </div>
                );
            } else {
                // Para texto normal, usar marked para processar Markdown
                return <div key={index} dangerouslySetInnerHTML={{ __html: marked(part) }} />;
            }
        });
    }

    // Verificar se é um texto que contém formato YAML
    if (content.includes('apiVersion:') &&
        (content.includes('kind:') || content.includes('metadata:') || content.includes('spec:'))) {
        // É provavelmente um trecho de YAML
        const highlightedCode = Prism.highlight(content, Prism.languages.yaml, 'yaml');

        return (
            <div className="yaml-code-block">
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </pre>
            </div>
        );
    }

    // Se não for encontrado nenhum bloco YAML, processar como Markdown
    return <div dangerouslySetInnerHTML={{ __html: marked(content) }} />;
};

// Função específica para renderizar blocos de comando com botão de copiar
const renderCommandBlock = (command: string, index: number, classes: ReturnType<typeof useStyles>) => {
    const handleCopyCommand = () => {
        navigator.clipboard.writeText(command);
    };

    return (
        <div className={classes.commandBlock} key={`cmd-${index}`}>
            <div style={{ paddingRight: '28px' }}>
                <pre style={{ margin: 0, overflow: 'auto', fontSize: '0.85rem' }}>{command}</pre>
            </div>
            <IconButton
                className={classes.copyButton}
                size="small"
                onClick={handleCopyCommand}
                aria-label="copiar comando"
            >
                <FileCopyIcon fontSize="small" />
            </IconButton>
        </div>
    );
};

// Função para renderizar cada passo da tarefa com suporte correto a YAML
const renderTaskContent = (task: Task, currentTask: number, tasks: Task[], classes: ReturnType<typeof useStyles>) => {
    return (
        <div>
            <Typography variant="body1" className={classes.taskDescription} gutterBottom>
                {task.description}
            </Typography>

            <Typography variant="h6" className={classes.taskTitle} style={{ marginTop: '16px', marginBottom: '8px' }}>
                Passos:
            </Typography>

            {task.steps.map((step, index) => (
                renderStep(step, index, classes)
            ))}

            {/* Tips section removed - now only shown via the tips button */}
        </div>
    );
};

const LabWorkspace: React.FC<LabWorkspaceProps> = ({ templateId, onExit }) => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [polling, setPolling] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [labInfo, setLabInfo] = useState<LabInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [verifying, setVerifying] = useState<number | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
    const [podStatus, setPodStatus] = useState<string>('pending');
    const [retryCount, setRetryCount] = useState(0);
    const fetchingRef = useRef(false);
    const lastFetchTimeRef = useRef<number>(0);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [allTasksCompleted, setAllTasksCompleted] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [tutorialComplete, setTutorialComplete] = useState(false);
    const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [currentTask, setCurrentTask] = useState(0);
    const [videoMaximized, setVideoMaximized] = useState(false);
    const [terminalMaximized, setTerminalMaximized] = useState(false);
    const terminalKey = useRef(`${labInfo?.namespace}-${labInfo?.podName}`);
    const [remainingTime, setRemainingTime] = useState<number | undefined>(undefined);
    const [timeWarningShown, setTimeWarningShown] = useState<boolean>(false);
    const [showTimeoutSummary, setShowTimeoutSummary] = useState<boolean>(false);
    const [timeoutSummaryData, setTimeoutSummaryData] = useState<{
        completedTasks: number;
        totalTasks: number;
        templateId: string;
        elapsedTime?: number;
    } | null>(null);

    // Handler for navigating to the next task
    const handleNextTask = () => {
        if (currentTask < tasks.length - 1) {
            setCurrentTask(currentTask + 1);
        }
    };

    // Handler for navigating to the previous task
    const handlePreviousTask = () => {
        if (currentTask > 0) {
            setCurrentTask(currentTask - 1);
        }
    };

    // Função para verificar o status do pod
    const checkPodStatus = useCallback(async () => {
        // Se o carregamento já foi completado, não verificar novamente
        if (loadingComplete) {
            return;
        }

        try {
            // Incrementar o contador de tentativas
            setRetryCount(prev => prev + 1);

            // Buscar informações do laboratório
            const response = await api.get('/labs/current');

            if (response.data) {
                const status = response.data.status;
                const allContainersReady = response.data.allContainersReady;

                // Atualizar informações do laboratório
                setLabInfo({
                    namespace: response.data.namespace,
                    podName: response.data.podName,
                    templateId: response.data.templateId,
                    status: status,
                    allContainersReady: allContainersReady,
                    containersStatus: response.data.containersStatus || [],
                    creationTimestamp: response.data.creationTimestamp,
                    youtubeVideo: response.data.youtubeVideo,
                    timerEnabled: response.data.timerEnabled,
                    startTime: response.data.startTime,
                    expirationTime: response.data.expirationTime,
                    remainingTime: response.data.remainingTime
                });

                setPodStatus(status);

                // Etapa 1: Criando o ambiente Kubernetes
                if (status === 'Running' && currentLoadingStep === 0) {
                    console.log("Etapa 1 concluída, avançando para etapa 2");
                    setCurrentLoadingStep(1);
                    return; // Sair e aguardar próximo ciclo
                }

                // Etapa 2: Inicializando contêineres
                if (status === 'Running' && allContainersReady && currentLoadingStep === 1) {
                    console.log("Etapa 2 concluída, avançando para etapa 3");
                    setCurrentLoadingStep(2);

                    // Aguardar 2 segundos na etapa 2 antes de avançar
                    setTimeout(() => {
                        console.log("Etapa 3 iniciada: Conectando ao terminal");
                        setCurrentLoadingStep(3);

                        // Aguardar mais 2 segundos na etapa 3 antes de finalizar
                        setTimeout(() => {
                            console.log("Carregamento concluído");
                            setLoadingComplete(true);
                            setPolling(false);
                            setLoading(false);
                            setSnackbarMessage('Laboratório pronto para uso!');
                            setSnackbarSeverity('success');
                            setSnackbarOpen(true);
                        }, 2000);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Erro ao verificar status do pod:', error);
        }
    }, [currentLoadingStep, loadingComplete]);

    // Iniciar polling quando o componente for montado
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (polling) {
            // Polling a cada 2 segundos (reduzido para evitar muitas requisições)
            interval = setInterval(() => {
                checkPodStatus();
            }, 2000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [polling, checkPodStatus]);

    // Obter informações iniciais do laboratório
    useEffect(() => {
        const fetchInitialLabInfo = async () => {
            try {
                setLoading(true);
                const response = await api.get('/labs/current');

                if (response.data) {
                    const labData = {
                        namespace: response.data.namespace,
                        podName: response.data.podName,
                        templateId: response.data.templateId,
                        status: response.data.status || 'Unknown',
                        allContainersReady: response.data.allContainersReady || false,
                        containersStatus: response.data.containersStatus || [],
                        creationTimestamp: response.data.creationTimestamp,
                        youtubeVideo: response.data.youtubeVideo,
                        timerEnabled: response.data.timerEnabled,
                        startTime: response.data.startTime,
                        expirationTime: response.data.expirationTime,
                        remainingTime: response.data.remainingTime
                    };

                    setLabInfo(labData);
                    setPodStatus(labData.status);

                    // Obter tarefas do template
                    if (response.data.tasks) {
                        console.log('Tasks from API:', response.data.tasks);
                        // Verificar se as tarefas incluem tips
                        response.data.tasks.forEach((task: Task, index: number) => {
                            console.log(`Task ${index} tips:`, task.tips);
                        });
                        setTasks(response.data.tasks);
                    } else {
                        const templateResponse = await api.get(`/templates/${templateId}`);
                        if (templateResponse.data && templateResponse.data.tasks) {
                            console.log('Tasks from template API:', templateResponse.data.tasks);
                            setTasks(templateResponse.data.tasks);
                        }
                    }

                    // Iniciar polling apenas se o pod não estiver pronto
                    if (labData.status !== 'Running' || !labData.allContainersReady) {
                        setPolling(true);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar informações do laboratório:', error);
                setError('Não foi possível carregar as informações do laboratório');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialLabInfo();

        return () => {
            setPolling(false);
        };
    }, [templateId]);

    // Verificar se é a primeira vez que o usuário está acessando o laboratório
    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (!hasSeenTutorial) {
            // Aguardar um pouco antes de mostrar o tutorial para dar tempo da interface carregar
            const timer = setTimeout(() => {
                setShowTutorial(true);
                // Marcar que o usuário já viu o tutorial
                localStorage.setItem('hasSeenTutorial', 'true');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Use o componente após a declaração de suas dependências
    useEffect(() => {
        // Aplicar highlighting ao carregar ou atualizar tarefas
        if (tasks.length > 0 && !loading) {
            setTimeout(() => {
                Prism.highlightAll();
            }, 100);
        }
    }, [tasks, loading]);

    // Atualize o terminalKey quando as informações do laboratório forem carregadas
    useEffect(() => {
        if (labInfo && labInfo.namespace && labInfo.podName) {
            terminalKey.current = `${labInfo.namespace}-${labInfo.podName}`;
        }
    }, [labInfo]);

    // Modificar o efeito de monitoramento de tempo para iniciar apenas quando o lab estiver carregado
    useEffect(() => {
        // Só iniciar o timer quando o lab estiver completamente carregado
        if (labInfo?.timerEnabled && labInfo?.remainingTime !== undefined && loadingComplete) {
            setRemainingTime(labInfo.remainingTime);
            const timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev === undefined) {
                        clearInterval(timer);
                        return undefined;
                    }

                    // Mostrar alerta quando faltarem 5 minutos
                    if (prev <= 300 && prev > 299 && !timeWarningShown) {
                        setTimeWarningShown(true);
                        setSnackbarMessage("Atenção! Você tem menos de 5 minutos para completar o laboratório.");
                        setSnackbarSeverity("warning");
                        setSnackbarOpen(true);
                    }

                    // Mostrar alerta crítico quando faltarem 30 segundos
                    if (prev <= 30 && prev > 29) {
                        setSnackbarMessage("ATENÇÃO! Seu laboratório será encerrado em 30 segundos!");
                        setSnackbarSeverity("error");
                        setSnackbarOpen(true);
                    }

                    // Quando o tempo acabar
                    if (prev <= 0) {
                        clearInterval(timer);
                        setSnackbarMessage("Tempo esgotado! O laboratório será encerrado e um resumo será exibido.");
                        setSnackbarSeverity("error");
                        setSnackbarOpen(true);

                        // Forçar encerramento imediato do laboratório sem perguntar
                        handleExit(true);

                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [labInfo?.timerEnabled, labInfo?.remainingTime, timeWarningShown, loadingComplete]);

    // Função para formatar o tempo restante
    const formatRemainingTime = (seconds: number): string => {
        // Mesmo quando o tempo estiver esgotado (zero ou negativo),
        // retornar formato de tempo 00:00:00 em vez de mensagem de texto
        const timeSeconds = Math.max(0, seconds);

        const hours = Math.floor(timeSeconds / 3600);
        const minutes = Math.floor((timeSeconds % 3600) / 60);
        const secs = timeSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Determinar a cor do timer baseado no tempo restante
    const getTimerColor = (seconds: number): "primary" | "secondary" | "default" => {
        if (seconds <= 30) return "secondary"; // Vermelho nos últimos 30 segundos (usando secondary que é vermelho)
        if (seconds <= 300) return "secondary"; // Destaque quando faltam menos de 5 minutos
        return "primary"; // Cor normal para o resto do tempo
    };

    // Função para verificação de tarefas
    const handleVerifyTask = async (taskIndex: number) => {
        if (!labInfo) {
            setSnackbarMessage('Informações do laboratório não disponíveis');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            setVerifying(taskIndex);
            console.log(`Validando tarefa ${taskIndex + 1}`);

            // Evitar que o polling seja reiniciado durante a verificação
            const wasPolling = polling;
            if (polling) {
                setPolling(false);
            }

            try {
                // Usar o endpoint de validação
                const response = await api.post(
                    `/pods/${labInfo.namespace}/${labInfo.podName}/validate`,
                    {
                        templateId: labInfo.templateId,
                        taskIndex: taskIndex
                    }
                );

                if (response.data && response.data.success) {
                    // Adicionar a tarefa à lista de tarefas concluídas (se ainda não estiver)
                    if (!completedTasks.includes(taskIndex)) {
                        const newCompletedTasks = [...completedTasks, taskIndex];
                        setCompletedTasks(newCompletedTasks);

                        // Verificar se todas as tarefas foram completadas
                        if (newCompletedTasks.length === tasks.length) {
                            setAllTasksCompleted(true);
                            setSnackbarMessage('Parabéns! Você completou todas as tarefas!');
                        } else {
                            setSnackbarMessage(`Tarefa ${taskIndex + 1} concluída com sucesso!`);
                        }
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                    }
                } else {
                    const errorMessage = response.data?.message || 'Validação falhou. Verifique os passos e tente novamente.';
                    setSnackbarMessage(errorMessage);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            } finally {
                // Restaurar o polling apenas se estava ativo antes e o pod não está pronto
                if (wasPolling && labInfo && (labInfo.status !== 'Running' || !labInfo.allContainersReady)) {
                    setPolling(true);
                }
            }
        } catch (error) {
            console.error('Erro ao validar tarefa:', error);
            setSnackbarMessage('Erro ao validar tarefa. Por favor, tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setVerifying(null);
        }
    };

    // Função para sair do laboratório
    const handleExit = async (forceExit = false) => {
        try {
            if (forceExit) {
                // Se forceExit for true, sai imediatamente sem confirmação
                console.log("Forçando saída do laboratório devido ao tempo esgotado");

                // Preparar dados para o resumo
                if (labInfo) {
                    // Calcular o tempo decorrido (se tivermos startTime)
                    let elapsedTime: number | undefined = undefined;
                    if (labInfo.startTime) {
                        const startTime = new Date(labInfo.startTime).getTime();
                        const currentTime = new Date().getTime();
                        elapsedTime = Math.floor((currentTime - startTime) / 1000); // em segundos
                    }

                    // Preparar dados do resumo
                    setTimeoutSummaryData({
                        completedTasks: completedTasks.length,
                        totalTasks: tasks.length,
                        templateId: labInfo.templateId,
                        elapsedTime
                    });

                    // Mostrar tela de resumo
                    setShowTimeoutSummary(true);
                }

                // Eliminar o laboratório em segundo plano
                await api.delete('/labs/current?force=true');

                return;
            }

            // Caso contrário, comportamento normal (exibe diálogo)
            if (onExit) {
                onExit();
            }
        } catch (error) {
            console.error('Erro ao sair do laboratório:', error);
            // Em caso de erro, ainda tenta mostrar o resumo
            if (forceExit && labInfo) {
                setTimeoutSummaryData({
                    completedTasks: completedTasks.length,
                    totalTasks: tasks.length,
                    templateId: labInfo.templateId,
                });
                setShowTimeoutSummary(true);
            } else if (onExit) {
                onExit();
            }
        }
    };

    // Função para reiniciar o laboratório
    const handleRestartLab = async () => {
        try {
            setLoading(true);
            // Primeiro, deletar o laboratório atual se existir
            try {
                await api.delete('/labs/current');
            } catch (err) {
                console.error('Erro ao deletar laboratório atual:', err);
            }

            // Criar um novo laboratório com o mesmo template
            const response = await api.post('/labs', { templateId });
            if (response.data) {
                // Limpar estados
                setCompletedTasks([]);
                setAllTasksCompleted(false);
                setPodStatus('pending');
                setPolling(true);
                setRetryCount(0);

                // Atualizar com dados do novo laboratório
                setLabInfo({
                    namespace: response.data.namespace,
                    podName: response.data.podName,
                    templateId: response.data.templateId,
                    status: response.data.status || 'Unknown',
                    allContainersReady: false,
                    containersStatus: [],
                    creationTimestamp: new Date().toISOString(),
                    youtubeVideo: response.data.youtubeVideo,
                    timerEnabled: response.data.timerEnabled,
                    startTime: response.data.startTime,
                    expirationTime: response.data.expirationTime,
                    remainingTime: response.data.remainingTime
                });

                // Iniciar polling para o novo pod
                setTimeout(() => {
                    checkPodStatus();
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao reiniciar laboratório:', error);
            setSnackbarMessage('Erro ao reiniciar laboratório. Tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenTutorial = () => {
        setShowTutorial(true);
    };

    const handleCloseTutorial = () => {
        setShowTutorial(false);
    };

    // Função para abrir o modal de dicas
    const handleOpenTips = () => {
        setShowTips(true);
    };

    // Função para fechar o modal de dicas
    const handleCloseTips = () => {
        setShowTips(false);
    };

    // Função para alternar entre vídeo maximizado e minimizado
    const toggleVideoSize = () => {
        setVideoMaximized(!videoMaximized);
    };

    // Função para alternar entre terminal maximizado e minimizado
    const toggleTerminalSize = () => {
        setTerminalMaximized(!terminalMaximized);
    };

    // Modificação na renderização do conteúdo de carregamento
    const renderLoadingContent = () => {
        // Calcular a porcentagem real de progresso
        const progressPercentage = Math.min((currentLoadingStep / 3) * 100, 100);

        // Calcular o número máximo de verificações com base no tempo máximo de espera (2 minutos)
        const maxRetries = 15; // 2 minutos com verificações a cada 2 segundos

        return (
            <Box className={classes.loadingContainer} borderRadius={8} boxShadow={3}>
                <Box mb={4} textAlign="center">
                    <Typography variant="h4" className={classes.loadingTitle} style={{ fontWeight: 600 }}>
                        Preparando seu laboratório...
                    </Typography>
                    <Typography variant="body1" color="textSecondary" style={{ opacity: 0.8 }}>
                        Estamos configurando o ambiente para você começar a praticar
                    </Typography>
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    className={classes.loadingProgress}
                    color="primary"
                    style={{ height: 10, borderRadius: 5 }}
                />

                <Paper
                    elevation={0}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        padding: '24px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        marginTop: '16px',
                        width: '100%'
                    }}
                >
                    <Grid container spacing={3} className={classes.loadingStep}>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" mb={1}>
                                {currentLoadingStep === 0 ? (
                                    <CircularProgress size={28} style={{ color: '#fdc43f' }} />
                                ) : (
                                    <CheckCircleOutlineIcon className={`${classes.statusIcon} ${classes.successIcon}`} style={{ fontSize: 28 }} />
                                )}
                                <Box ml={2} flex={1}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>
                                        Criando o ambiente Kubernetes
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {currentLoadingStep === 0 ? `Status: ${podStatus}` : 'Concluído com sucesso!'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" mb={1}>
                                {currentLoadingStep === 1 ? (
                                    <CircularProgress size={28} style={{ color: '#fdc43f' }} />
                                ) : currentLoadingStep > 1 ? (
                                    <CheckCircleOutlineIcon className={`${classes.statusIcon} ${classes.successIcon}`} style={{ fontSize: 28 }} />
                                ) : (
                                    <Box width={28} height={28} borderRadius="50%" bgcolor="rgba(255,255,255,0.1)" display="flex" alignItems="center" justifyContent="center">
                                        <Typography variant="body2" style={{ fontWeight: 600, opacity: 0.5 }}>2</Typography>
                                    </Box>
                                )}
                                <Box ml={2} flex={1} style={{ opacity: currentLoadingStep < 1 ? 0.5 : 1 }}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>
                                        Inicializando contêineres
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {currentLoadingStep === 1 ? 'Em andamento...' : currentLoadingStep > 1 ? 'Todos os contêineres estão prontos' : 'Aguardando...'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" mb={1}>
                                {currentLoadingStep === 2 || currentLoadingStep === 3 ? (
                                    <CircularProgress size={28} style={{ color: '#fdc43f' }} />
                                ) : currentLoadingStep > 3 ? (
                                    <CheckCircleOutlineIcon className={`${classes.statusIcon} ${classes.successIcon}`} style={{ fontSize: 28 }} />
                                ) : (
                                    <Box width={28} height={28} borderRadius="50%" bgcolor="rgba(255,255,255,0.1)" display="flex" alignItems="center" justifyContent="center">
                                        <Typography variant="body2" style={{ fontWeight: 600, opacity: 0.5 }}>3</Typography>
                                    </Box>
                                )}
                                <Box ml={2} flex={1} style={{ opacity: currentLoadingStep < 2 ? 0.5 : 1 }}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>
                                        Conectando ao terminal
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {(currentLoadingStep === 2 || currentLoadingStep === 3) ? 'Estabelecendo conexão...' : currentLoadingStep > 3 ? 'Conexão estabelecida' : 'Aguardando inicialização dos contêineres...'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                    <TimerIcon style={{ color: '#aaa', marginRight: 8, fontSize: 20 }} />
                    <Typography variant="body2" style={{ color: '#aaa' }}>
                        Isso pode levar alguns instantes. O ambiente está sendo criado para você.
                    </Typography>
                </Box>
            </Box>
        );
    };

    // Renderizar o componente de resumo do tempo esgotado
    const renderTimeoutSummary = () => {
        if (!timeoutSummaryData) return null;

        // Formatar o tempo decorrido, se disponível
        const formatElapsedTime = (seconds?: number): string => {
            if (!seconds) return "Não disponível";

            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        // Calcular a porcentagem de conclusão
        const completionPercentage = Math.round((timeoutSummaryData.completedTasks / timeoutSummaryData.totalTasks) * 100) || 0;

        // Determinar mensagem motivacional com base no progresso
        let feedbackMessage = "Continue praticando!";
        if (completionPercentage === 100) {
            feedbackMessage = "Parabéns por completar todas as tarefas!";
        } else if (completionPercentage >= 75) {
            feedbackMessage = "Você avançou bastante! Continue assim!";
        } else if (completionPercentage >= 50) {
            feedbackMessage = "Bom progresso! Na próxima vez você vai mais longe!";
        } else if (completionPercentage >= 25) {
            feedbackMessage = "Você está no caminho certo!";
        }

        return (
            <Box className={classes.loadingContainer} borderRadius={8} boxShadow={3}>
                <Box mb={4} textAlign="center">
                    <TimerOutlinedIcon style={{ fontSize: 60, color: '#f44336', marginBottom: 16 }} />
                    <Typography variant="h4" className={classes.loadingTitle} style={{ fontWeight: 600, color: '#f44336' }}>
                        Tempo Esgotado!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" style={{ opacity: 0.8 }}>
                        O tempo limite do laboratório foi atingido e os recursos foram liberados.
                    </Typography>
                </Box>

                <Paper
                    elevation={0}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        padding: '24px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        width: '100%'
                    }}
                >
                    <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                        Resumo da Sessão
                    </Typography>

                    <Box mt={3}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: '#e0e0e0',
                                maxWidth: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{ flexShrink: 0 }}>Laboratório:</span> <strong style={{ marginLeft: '8px', color: '#fff', whiteSpace: 'nowrap' }}>{timeoutSummaryData.templateId}</strong>
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom style={{ color: '#e0e0e0' }}>
                            Tarefas concluídas: <strong style={{ color: '#fff' }}>{timeoutSummaryData.completedTasks} de {timeoutSummaryData.totalTasks}</strong>
                        </Typography>

                        <Box mt={2} mb={1}>
                            <Typography variant="body2" style={{ marginBottom: '4px', color: '#e0e0e0' }}>
                                Progresso: {completionPercentage}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={completionPercentage}
                                style={{
                                    height: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }}
                                color={completionPercentage >= 80 ? "primary" : completionPercentage >= 50 ? "secondary" : "secondary"}
                            />
                        </Box>

                        <Box mt={3} bgcolor="rgba(0,0,0,0.3)" p={2} borderRadius={1} textAlign="center">
                            <Typography variant="body1" style={{
                                fontWeight: 500,
                                color: completionPercentage >= 75 ? '#4caf50' : '#fdc43f',
                                textShadow: '0px 0px 2px rgba(0,0,0,0.7)'
                            }}>
                                {feedbackMessage}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/')}
                    style={{
                        marginTop: '16px',
                        backgroundColor: '#fdc43f',
                        color: '#000',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        textTransform: 'uppercase'
                    }}
                >
                    Voltar para a Lista de Laboratórios
                </Button>
            </Box>
        );
    };

    // Renderização condicional com base no estado
    let labContent;
    if (showTimeoutSummary) {
        labContent = renderTimeoutSummary();
    } else if (loading || (!loadingComplete && podStatus === 'Running')) {
        labContent = renderLoadingContent();
    } else if (error) {
        labContent = (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4} my={4}>
                <Paper
                    elevation={2}
                    style={{
                        padding: '32px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        textAlign: 'center',
                        backgroundColor: '#2d323b',
                        borderLeft: '4px solid #f44336'
                    }}
                >
                    <ErrorOutlineIcon style={{ fontSize: 60, color: '#f44336', marginBottom: 16 }} />
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 600, color: '#e0e0e0' }}>
                        Erro ao carregar laboratório
                    </Typography>
                    <Typography variant="body1" paragraph style={{ color: '#b0b0b0' }}>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRestartLab}
                        style={{ marginTop: '16px', backgroundColor: '#fdc43f', color: '#000' }}
                    >
                        Tentar novamente
                    </Button>
                </Paper>
            </Box>
        );
    } else if (!labInfo) {
        labContent = (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4} my={4}>
                <Paper
                    elevation={2}
                    style={{
                        padding: '32px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        textAlign: 'center',
                        backgroundColor: '#2d323b',
                        borderLeft: '4px solid #fdc43f'
                    }}
                >
                    <Box mb={3}>
                        <img
                            src="/assets/images/pinguim-toskao.png"
                            alt="Pinguim Toskão"
                            style={{ width: '80px', height: '80px', opacity: 0.9 }}
                        />
                    </Box>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 600, color: '#e0e0e0' }}>
                        Nenhum laboratório encontrado
                    </Typography>
                    <Typography variant="body1" paragraph style={{ color: '#b0b0b0' }}>
                        Não foi possível encontrar um laboratório ativo. Deseja criar um novo?
                    </Typography>
                    <Button
                        variant="contained"
                        className={classes.verifyButton}
                        onClick={handleRestartLab}
                        startIcon={<PlayArrowIcon />}
                        size="large"
                    >
                        Criar laboratório
                    </Button>
                </Paper>
            </Box>
        );
    } else if (podStatus !== 'Running' || !labInfo.allContainersReady) {
        // Pod ainda não está totalmente pronto
        labContent = renderLoadingContent();
    } else if (allTasksCompleted) {
        // Todas as tarefas foram concluídas - mostrar tela de conclusão
        labContent = <LabCompletion templateId={templateId} tasks={tasks} onNewLab={handleRestartLab} />;
    } else {
        // Normal state - show terminal and tasks
        labContent = (
            <div className={classes.terminalAndTasksContainer}>
                <div className={classes.terminalContainer}>
                    <div
                        style={{
                            flex: 1,
                            display: terminalMaximized ? 'none' : 'flex',
                            flexDirection: 'column',
                            height: labInfo && labInfo.youtubeVideo && !videoMaximized ? 'calc(100% - 120px)' : '100%',
                            marginBottom: labInfo && labInfo.youtubeVideo && !videoMaximized ? '16px' : '0'
                        }}
                    >
                        <Paper className={classes.paper} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div className={classes.terminalHeader}>
                                <CodeIcon className={classes.terminalIcon} />
                                <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                                    Terminal
                                </Typography>
                                <div className={classes.badge}>Conectado</div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <IconButton size="small" onClick={toggleTerminalSize} title="Maximizar terminal">
                                        <FullscreenIcon style={{ color: '#90caf9', fontSize: '1.2rem' }} />
                                    </IconButton>
                                </div>
                            </div>
                            <div className={classes.terminalWrapper}>
                                {labInfo && labInfo.status === 'Running' && labInfo.allContainersReady && !terminalMaximized && (
                                    <Terminal
                                        key={terminalKey.current}
                                        namespace={labInfo.namespace}
                                        pod={labInfo.podName}
                                    />
                                )}
                            </div>
                        </Paper>
                    </div>

                    {labInfo && labInfo.youtubeVideo && !videoMaximized && !terminalMaximized && (
                        <div className={classes.videoContainer} style={{ height: '120px' }}>
                            <Paper className={classes.paper} style={{ height: '100%' }}>
                                <div className={classes.terminalHeader}>
                                    <PlayCircleOutlineIcon className={classes.terminalIcon} />
                                    <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                                        Vídeo Complementar
                                    </Typography>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <IconButton size="small" onClick={toggleVideoSize} title="Maximizar vídeo">
                                            <FullscreenIcon style={{ color: '#90caf9', fontSize: '1.2rem' }} />
                                        </IconButton>
                                    </div>
                                </div>
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%', // Proporção 16:9
                                    height: 0,
                                    overflow: 'hidden'
                                }}>
                                    <iframe
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            border: 'none'
                                        }}
                                        src={`https://www.youtube.com/embed/${labInfo.youtubeVideo.split('v=')[1]}?modestbranding=1`}
                                        title="Vídeo Complementar"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </Paper>
                        </div>
                    )}

                    {/* Terminal maximizado */}
                    {terminalMaximized && (
                        <div className={classes.videoContainerMaximized} style={{ position: 'fixed', top: '80px', left: '0', width: '100%', height: 'calc(100vh - 80px)', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <div style={{ position: 'relative', width: '95%', maxWidth: '1800px', height: '90%' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                    <IconButton onClick={toggleTerminalSize} style={{ color: 'white' }}>
                                        <FullscreenExitIcon />
                                    </IconButton>
                                </div>
                                <div style={{ position: 'relative', height: 'calc(100% - 40px)', backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '4px' }}>
                                    {labInfo && labInfo.status === 'Running' && labInfo.allContainersReady && (
                                        <Terminal
                                            key={terminalKey.current}
                                            namespace={labInfo.namespace}
                                            pod={labInfo.podName}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Vídeo maximizado */}
                    {labInfo && labInfo.youtubeVideo && videoMaximized && (
                        <div className={classes.videoContainerMaximized} style={{ position: 'fixed', top: '80px', left: '0', width: '100%', height: 'calc(100vh - 80px)', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <div style={{ position: 'relative', width: '80%', maxWidth: '1200px', maxHeight: '80vh' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                    <IconButton onClick={toggleVideoSize} style={{ color: 'white' }}>
                                        <FullscreenExitIcon />
                                    </IconButton>
                                </div>
                                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                    <iframe
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            border: 'none'
                                        }}
                                        src={`https://www.youtube.com/embed/${labInfo.youtubeVideo.split('v=')[1]}`}
                                        title="Vídeo Complementar"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!terminalMaximized && (
                    <div className={classes.tasksContainer}>
                        <Paper className={classes.paper} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div className={classes.terminalHeader}>
                                <CheckCircleOutlineIcon className={classes.terminalIcon} style={{ color: '#4caf50' }} />
                                <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                                    Tarefas
                                </Typography>
                            </div>

                            <div className={classes.taskContainer} style={{ overflowY: 'auto', flex: 1 }}>
                                {tasks.length > 0 && (
                                    <>
                                        <Box mb={2} className={classes.progressContainer}>
                                            <Typography variant="subtitle2" style={{ marginBottom: '8px', fontWeight: 600 }}>
                                                Laboratório de {templateId}
                                            </Typography>

                                            <LinearProgress
                                                variant="determinate"
                                                value={(completedTasks.length / tasks.length) * 100}
                                                style={{
                                                    height: '6px',
                                                    borderRadius: '3px',
                                                    marginBottom: '8px',
                                                    backgroundColor: '#444',
                                                }}
                                            />

                                            <Box className={classes.taskProgressInfo}>
                                                <Typography variant="body2">
                                                    Tarefas: {completedTasks.length}/{tasks.length}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Tempo estimado: 45 min
                                                </Typography>
                                            </Box>

                                            <Box className={classes.tipContainer}>
                                                <img
                                                    src="/assets/images/pinguim-toskao.png"
                                                    alt="Pinguim Toskão"
                                                    className={classes.tipImage}
                                                />
                                                <Typography variant="body2" style={{ fontSize: '0.8rem' }}>
                                                    Dica: Execute os comandos na ordem indicada para completar as tarefas.
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <div className={classes.taskHeader}>
                                            <Typography variant="h6" style={{
                                                color: completedTasks.includes(currentTask) ? '#4caf50' : '#fdc43f',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {currentTask + 1}. {tasks[currentTask].name}
                                                {completedTasks.includes(currentTask) && (
                                                    <CheckCircleOutlineIcon style={{ marginLeft: '8px', color: '#4caf50' }} />
                                                )}
                                            </Typography>
                                        </div>

                                        <div className="task-description">
                                            {renderTaskContent(tasks[currentTask], currentTask, tasks, classes)}
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>
                                            <Button
                                                className={classes.verifyButton}
                                                onClick={() => handleVerifyTask(currentTask)}
                                                disabled={verifying === currentTask}
                                                size="large"
                                            >
                                                {verifying === currentTask ? 'Verificando...' : 'VERIFICAR'}
                                            </Button>
                                        </div>

                                        <div className={classes.navigationButtons}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handlePreviousTask}
                                                disabled={currentTask === 0}
                                                startIcon={<ArrowBackIcon />}
                                            >
                                                Tarefa Anterior
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNextTask}
                                                disabled={currentTask === tasks.length - 1}
                                                endIcon={<ArrowForwardIcon />}
                                            >
                                                Próxima Tarefa
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Paper>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title} style={{ flexGrow: 1 }}>
                        Laboratório: {labInfo?.templateId || templateId}
                    </Typography>
                    <div className={classes.headerContent}>
                        <div className={classes.headerRight}>
                            {remainingTime !== undefined && labInfo?.timerEnabled && (
                                <>
                                    <Chip
                                        icon={<TimerIcon />}
                                        label={formatRemainingTime(remainingTime)}
                                        color={getTimerColor(remainingTime)}
                                        variant="outlined"
                                        className={`${classes.timerChip} ${remainingTime <= 30 ? 'critical' : ''}`}
                                        component="div"
                                    />
                                    <Chip
                                        icon={<EmojiEventsIcon />}
                                        label="Desafio"
                                        color="primary"
                                        variant="outlined"
                                        style={{ marginRight: '8px' }}
                                        component="div"
                                    />
                                </>
                            )}
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ExitToAppIcon />}
                                onClick={(e) => handleExit()}
                                className={classes.exitButton}
                            >
                                Sair
                            </Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            <div className={classes.labSection}>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>

                {labContent}
            </div>

            <Tooltip title="Ajuda e Tutoriais" placement="left">
                <IconButton
                    color="secondary"
                    className={classes.helpButton}
                    onClick={handleOpenTutorial}
                    aria-label="ajuda"
                    style={{ bottom: '80px' }}
                >
                    <HelpIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Dicas" placement="left">
                <IconButton
                    color="primary"
                    className={classes.helpButton}
                    onClick={handleOpenTips}
                    aria-label="dicas"
                >
                    <InfoIcon />
                </IconButton>
            </Tooltip>

            <TutorialGuide
                open={showTutorial}
                onClose={handleCloseTutorial}
            />

            {/* Modal para exibir as dicas */}
            <Dialog
                open={showTips}
                onClose={handleCloseTips}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <InfoIcon style={{ marginRight: '8px', color: '#fdc43f' }} />
                        <Typography variant="h6">Dicas para esta tarefa</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {(() => {
                        // Log detalhado para depuração
                        console.log('Current task index:', currentTask);
                        console.log('All tasks:', tasks);

                        if (tasks.length === 0) {
                            console.log('No tasks available');
                            return <Typography>Carregando tarefas...</Typography>;
                        }

                        const currentTaskData = tasks[currentTask];
                        console.log('Current task data:', currentTaskData);

                        if (!currentTaskData) {
                            console.log('Current task data is undefined');
                            return <Typography>Tarefa não encontrada.</Typography>;
                        }

                        console.log('Tips data:', currentTaskData.tips);

                        if (!currentTaskData.tips || !Array.isArray(currentTaskData.tips) || currentTaskData.tips.length === 0) {
                            console.log('No tips available for this task');
                            return <Typography>Não há dicas disponíveis para esta tarefa.</Typography>;
                        }

                        console.log(`Found ${currentTaskData.tips.length} tips for this task`);

                        return (
                            <div className="tips-content">
                                {currentTaskData.tips.map((tip, index) => {
                                    console.log(`Rendering tip ${index}:`, tip);
                                    return (
                                        <LinuxTip
                                            key={index}
                                            title={tip.title || "Dica"}
                                            type={tip.type || "tip"}
                                        >
                                            {tip.content}
                                        </LinuxTip>
                                    );
                                })}
                            </div>
                        );
                    })()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTips} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LabWorkspace; 