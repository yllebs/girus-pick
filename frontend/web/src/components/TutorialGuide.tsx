import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
    makeStyles,
    IconButton
} from '@material-ui/core';
import {
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
    ExitToApp as ExitToAppIcon,
    Help as HelpIcon,
    NavigateNext as NavigateNextIcon,
    NavigateBefore as NavigateBeforeIcon,
    Computer as ComputerIcon,
    Assignment as AssignmentIcon,
    List as ListIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: theme.spacing(1),
            color: theme.palette.primary.main,
        },
    },
    stepLabel: {
        '& .MuiStepLabel-iconContainer': {
            paddingRight: theme.spacing(1),
        },
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    image: {
        width: '100%',
        maxWidth: 500,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
    },
    highlight: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(0.5, 1),
        borderRadius: theme.shape.borderRadius,
        fontWeight: 'bold',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: 120,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: theme.shape.borderRadius,
    },
    stepIcon: {
        fontSize: 64,
        color: theme.palette.primary.main,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

// Define os passos do tutorial sem imagens
const tutorialSteps = [
    {
        label: 'Bem-vindo ao Girus Labs',
        description: `Bem-vindo ao ambiente de laboratórios interativos Girus! 
                     Esta plataforma foi desenvolvida para ajudar você a aprender
                     tecnologias Linux e Kubernetes de forma prática.`,
        icon: <HelpIcon />
    },
    {
        label: 'Terminal Interativo',
        description: `O terminal interativo permite que você execute comandos
                      diretamente em um contêiner Kubernetes. Você pode usar todos
                      os comandos Linux disponíveis no ambiente.`,
        icon: <ComputerIcon />
    },
    {
        label: 'Tarefas e Validação',
        description: `Cada laboratório possui uma série de tarefas que você deve completar.
                      Após realizar cada tarefa, clique no botão "Verificar" para validar
                      automaticamente se você completou o desafio corretamente.`,
        icon: <AssignmentIcon />
    },
    {
        label: 'Vídeos Complementares',
        description: `Laboratórios podem incluir vídeos complementares que ajudam
                     a entender melhor os conceitos. Você pode maximizar o vídeo
                     clicando no ícone de tela cheia para uma melhor visualização.`,
        icon: <ListIcon />
    },
    {
        label: 'Saindo do Laboratório',
        description: `Quando terminar o laboratório, clique no botão "SAIR DO LABORATÓRIO"
                     para encerrar a sessão atual. Você pode voltar à página inicial
                     e iniciar um novo laboratório a qualquer momento.`,
        icon: <ExitToAppIcon />
    },
    {
        label: 'Suporte e Comunidade',
        description: `Se precisar de ajuda, você pode participar da comunidade através do
                     GitHub oficial (github.com/badtuxx/girus) ou no Discord da LINUXtips.
                     Nossa comunidade está sempre pronta para ajudar você em sua jornada de aprendizado!`,
        icon: <HelpIcon />
    },
];

interface TutorialGuideProps {
    open: boolean;
    onClose: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ open, onClose }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    // Reiniciar o tutorial quando for aberto
    useEffect(() => {
        if (open) {
            setActiveStep(0);
        }
    }, [open]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            // Se estiver no último passo, fecha o tutorial
            if (prevActiveStep === tutorialSteps.length - 1) {
                return prevActiveStep;
            }
            return prevActiveStep + 1;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            aria-labelledby="tutorial-dialog-title"
        >
            <DialogTitle id="tutorial-dialog-title" disableTypography className={classes.title}>
                <div className={classes.titleText}>
                    <HelpIcon />
                    <Typography variant="h6">Tutorial Girus Labs</Typography>
                </div>
                <IconButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {tutorialSteps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel className={classes.stepLabel}>
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>

                                    {/* Mostrar ícone em vez de imagem */}
                                    <div className={classes.iconContainer}>
                                        {React.cloneElement(step.icon as React.ReactElement, { className: classes.stepIcon })}
                                    </div>

                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                                startIcon={<NavigateBeforeIcon />}
                                            >
                                                Anterior
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={activeStep === tutorialSteps.length - 1 ? handleFinish : handleNext}
                                                className={classes.button}
                                                endIcon={activeStep === tutorialSteps.length - 1 ? undefined : <NavigateNextIcon />}
                                            >
                                                {activeStep === tutorialSteps.length - 1 ? 'Concluir' : 'Próximo'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TutorialGuide; 