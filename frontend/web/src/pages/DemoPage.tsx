import React from 'react';
import { Container, Typography, Divider, Grid, Paper, Button, Card, CardContent, CardActions, Box, Link, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KubernetesLabHeader from '../components/KubernetesLabHeader';
import KubernetesResource from '../components/KubernetesResource';
import KubernetesYaml from '../components/KubernetesYaml';
import LinuxTip from '../components/LinuxTip';
import TerminalCommand from '../components/TerminalCommand';
import LabProgress from '../components/LabProgress';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/linuxtips-theme.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import CodeIcon from '@material-ui/icons/Code';
import SchoolIcon from '@material-ui/icons/School';
import SecurityIcon from '@material-ui/icons/Security';
import BuildIcon from '@material-ui/icons/Build';
import StorageIcon from '@material-ui/icons/Storage';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DevicesIcon from '@material-ui/icons/Devices';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import SpeedIcon from '@material-ui/icons/Speed';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: '#1c1e22',
        minHeight: '100vh',
    },
    title: {
        margin: theme.spacing(2, 0, 2),
        color: '#e0e0e0',
        borderBottom: 'none',
        paddingBottom: theme.spacing(1),
        fontWeight: 700,
    },
    subtitle: {
        color: '#b0b0b0',
        marginBottom: theme.spacing(4)
    },
    sectionTitle: {
        color: '#e0e0e0',
        margin: theme.spacing(3, 0, 1),
        fontWeight: 600,
    },
    paper: {
        padding: theme.spacing(3),
        backgroundColor: '#2d323b',
        color: '#e0e0e0',
        height: '100%',
        borderLeft: '4px solid #fdc43f',
    },
    heroPaper: {
        padding: theme.spacing(4),
        backgroundColor: '#2d323b',
        color: '#e0e0e0',
        backgroundImage: 'linear-gradient(rgba(45, 50, 59, 0.95), rgba(45, 50, 59, 0.95)), url("/assets/images/kubernetes-logo.png")',
        backgroundSize: '300px',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px',
        borderLeft: '4px solid #fdc43f',
    },
    card: {
        backgroundColor: '#2d323b',
        color: '#e0e0e0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
        },
    },
    cardContent: {
        flexGrow: 1
    },
    divider: {
        margin: theme.spacing(4, 0),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureIcon: {
        fontSize: 48,
        color: '#fdc43f',
        marginBottom: theme.spacing(2)
    },
    featureCard: {
        backgroundColor: 'rgba(45, 50, 59, 0.7)',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        borderRadius: '8px',
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: 'rgba(45, 50, 59, 0.9)',
        }
    },
    button: {
        marginTop: theme.spacing(2)
    },
    ctaButton: {
        backgroundColor: '#fdc43f',
        color: '#000',
        fontWeight: 600,
        borderRadius: '4px',
        padding: '12px 28px',
        '&:hover': {
            backgroundColor: '#e3b037',
        },
        margin: theme.spacing(2, 0),
        fontSize: '1.1rem',
    },
    challengeButton: {
        backgroundColor: '#FF5722',
        color: 'white',
        fontWeight: 600,
        borderRadius: '4px',
        padding: '12px 28px',
        '&:hover': {
            backgroundColor: '#E64A19',
        },
        margin: theme.spacing(2, 0),
        fontSize: '1.1rem',
    },
    secondaryButton: {
        color: '#fff',
        borderColor: '#fdc43f',
        fontWeight: 600,
        marginLeft: theme.spacing(2),
        '&:hover': {
            borderColor: '#e3b037',
            backgroundColor: 'rgba(253, 196, 63, 0.1)',
        }
    },
    cardButton: {
        color: '#fdc43f',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'rgba(253, 196, 63, 0.08)',
        },
    },
    icon: {
        verticalAlign: 'middle',
        marginRight: theme.spacing(1),
    },
    contributionSection: {
        marginTop: theme.spacing(4),
    },
    highlightText: {
        color: '#fdc43f',
        fontWeight: 500,
    },
    footer: {
        marginTop: theme.spacing(8),
        textAlign: 'center',
        color: '#b0b0b0',
    },
    diagram: {
        backgroundColor: '#222',
        padding: theme.spacing(3),
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        overflowX: 'auto',
        whiteSpace: 'pre',
        color: '#e0e0e0',
    },
    chip: {
        margin: theme.spacing(0.5),
        backgroundColor: 'rgba(253, 196, 63, 0.15)',
        color: '#fdc43f',
        fontWeight: 500,
    },
    statCard: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2d323b',
        borderRadius: '8px',
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#fdc43f',
    },
    statLabel: {
        color: '#e0e0e0',
    },
    heartIcon: {
        color: '#ff5252',
        fontSize: '1.2rem',
        verticalAlign: 'middle',
    }
}));

const DemoPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                {/* Hero Section - Improved with background and stronger CTA */}
                <Paper className={classes.heroPaper}>
                    <Typography variant="h3" className={classes.title}>
                        Girus - A Plataforma de Laboratórios Interativos
                    </Typography>

                    <Typography variant="h6" className={classes.subtitle} style={{ maxWidth: '700px' }}>
                        Domine tecnologias DevOps, SRE, Cloud Native, Platform Engineering e Desenvolvimento em ambientes reais e isolados, sem complexidades de configuração. Desenvolvido com <span className={classes.heartIcon}>❤</span> pela LINUXtips.
                    </Typography>

                    <Box mt={3}>
                        <Box display="flex" alignItems="center" flexWrap="wrap">
                            <Chip label="Open Source" className={classes.chip} size="small" />
                            <Chip label="Kubernetes" className={classes.chip} size="small" />
                            <Chip label="DevOps" className={classes.chip} size="small" />
                            <Chip label="Linux" className={classes.chip} size="small" />
                            <Chip label="SRE" className={classes.chip} size="small" />
                            <Chip label="AWS" className={classes.chip} size="small" />
                            <Chip label="Terraform" className={classes.chip} size="small" />
                            <Chip label="Cloud Native" className={classes.chip} size="small" />
                            <Chip label="Platform Engineering" className={classes.chip} size="small" />
                        </Box>

                        {/* Adicionar badge de versão */}
                        <Box mt={2}>
                            <Chip
                                label="Novo! v0.2.0"
                                size="small"
                                style={{
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            />
                        </Box>

                        <Box mt={4} display="flex" flexWrap="wrap">
                            <Button
                                component={RouterLink}
                                to="/labs"
                                variant="contained"
                                color="primary"
                                className={classes.ctaButton}
                            >
                                Começar Agora
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<GitHubIcon />}
                                href="https://github.com/badtuxx/girus"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.secondaryButton}
                            >
                                Ver no GitHub
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                {/* O que é o Girus */}
                <Typography variant="h5" className={classes.sectionTitle} style={{ marginTop: '48px' }}>
                    O que é o Girus Labs?
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography paragraph>
                                GIRUS é uma plataforma open-source de laboratórios interativos baseada em Kubernetes que permite a criação, gerenciamento e execução de ambientes de aprendizado prático para tecnologias como Linux, Docker, Kubernetes, AWS, Terraform, CI/CD, observabilidade e outras ferramentas essenciais para profissionais de DevOps, SRE, Platform Engineering e desenvolvimento.
                            </Typography>
                            <Typography paragraph>
                                Desenvolvida pela LINUXtips, a plataforma GIRUS se diferencia por ser executada localmente na máquina do usuário, eliminando a necessidade de infraestrutura na nuvem ou configurações complexas. Através de um CLI intuitivo, os usuários podem criar rapidamente ambientes isolados e seguros onde podem praticar e aperfeiçoar suas habilidades técnicas.
                            </Typography>
                            <Typography paragraph>
                                <strong>Novidade v1.2.0:</strong> Agora com suporte a simulação de serviços AWS (via LocalStack), laboratórios de Terraform e compatibilidade com Podman, além de melhorias na interface do usuário e otimizações de desempenho.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Principais Diferenciais */}
                <Typography variant="h5" className={classes.sectionTitle}>
                    Principais Diferenciais
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className={classes.featureCard}>
                            <CloudOffIcon className={classes.featureIcon} />
                            <Typography variant="h6" gutterBottom>
                                Execução Local
                            </Typography>
                            <Typography>
                                Diferentemente de plataformas como Katacoda ou Instruqt que funcionam como SaaS, o GIRUS é executado diretamente na sua máquina através de contêineres Docker/Podman e Kubernetes.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className={classes.featureCard}>
                            <SecurityIcon className={classes.featureIcon} />
                            <Typography variant="h6" gutterBottom>
                                Ambientes Isolados
                            </Typography>
                            <Typography>
                                Cada laboratório é executado em um ambiente Kubernetes isolado, garantindo segurança e evitando conflitos com o sistema host.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className={classes.featureCard}>
                            <DevicesIcon className={classes.featureIcon} />
                            <Typography variant="h6" gutterBottom>
                                Interface Intuitiva
                            </Typography>
                            <Typography>
                                Terminal interativo com tarefas guiadas, dicas contextuais e validação automática de progresso para uma experiência de aprendizado eficiente.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className={classes.featureCard}>
                            <SpeedIcon className={classes.featureIcon} />
                            <Typography variant="h6" gutterBottom>
                                Suporte a AWS e Terraform
                            </Typography>
                            <Typography>
                                Pratique AWS localmente com LocalStack e aprenda infraestrutura como código com os novos laboratórios de Terraform para criar recursos em nuvem.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className={classes.featureCard}>
                            <StorageIcon className={classes.featureIcon} />
                            <Typography variant="h6" gutterBottom>
                                Laboratórios Personalizáveis
                            </Typography>
                            <Typography>
                                Sistema de templates baseado em ConfigMaps do Kubernetes que facilita a criação e compartilhamento de novos laboratórios.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className={classes.featureCard}>
                            <CodeIcon className={classes.featureIcon} />
                            <Typography variant="h6" gutterBottom>
                                Multi-container
                            </Typography>
                            <Typography>
                                Suporte para Docker e agora também Podman, oferecendo flexibilidade na escolha do runtime de containers para os laboratórios.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Arquitetura - Diagram */}
                <Typography variant="h5" className={classes.sectionTitle} style={{ marginTop: '48px' }}>
                    Como Funciona o Girus
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Arquitetura Simplificada
                            </Typography>
                            <Typography paragraph>
                                O projeto GIRUS é composto por quatro componentes principais que trabalham juntos para oferecer uma experiência de aprendizado perfeita:
                            </Typography>
                            <Typography component="ol">
                                <li><strong>GIRUS CLI</strong>: Ferramenta de linha de comando que gerencia todo o ciclo de vida da plataforma</li>
                                <li><strong>Backend</strong>: API Golang que orquestra os laboratórios através da API do Kubernetes</li>
                                <li><strong>Frontend</strong>: Interface web React que fornece acesso ao terminal interativo e às tarefas</li>
                                <li><strong>Templates de Laboratórios</strong>: Definições YAML para os diferentes laboratórios disponíveis</li>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className={classes.diagram}>
                            {`┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  GIRUS CLI  │────▶│ Kind Cluster │────▶│ Kubernetes   │
└─────────────┘     └──────────────┘     └──────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Terminal   │◀───▶│   Frontend   │◀───▶│   Backend    │
│ Interativo  │     │    (React)   │     │     (Go)     │
└─────────────┘     └──────────────┘     └──────────────┘
                                               │
                                               ▼
                                         ┌──────────────┐
                                         │  Templates   │
                                         │     Labs     │
                                         └──────────────┘`}
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '24px' }}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                1. Instalação em Minutos
                            </Typography>
                            <Typography>
                                Instalação com apenas um comando na sua máquina local. O CLI verifica dependências, cria o cluster Kind e implanta todos os componentes automaticamente.
                            </Typography>
                            <Box mt={2}>
                                <TerminalCommand
                                    command="curl -fsSL https://girus.linuxtips.io | bash"
                                    output="Instalando GIRUS CLI..."
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                2. Laboratórios Reais, Isolados
                            </Typography>
                            <Typography>
                                Cada laboratório cria ambientes Kubernetes completos e isolados, com todas as dependências pré-configuradas. Experimente, modifique, quebre e conserte - tudo dentro de um container seguro que não afeta sua máquina host.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                3. Aprendizado Guiado com Feedback
                            </Typography>
                            <Typography>
                                Siga progresso passo a passo, recebendo feedback preciso sobre o que está correto e o que precisa ser ajustado. Este ciclo de aprendizado acelerado elimina dúvidas, reforça conceitos e transforma conhecimento teórico em habilidades práticas aplicáveis imediatamente.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                {/* Tipos de Laboratórios */}
                <Typography variant="h5" className={classes.sectionTitle}>
                    Tipos de Laboratórios
                </Typography>

                <Typography paragraph style={{ color: '#b0b0b0', maxWidth: '800px', margin: '0 auto 24px auto', textAlign: 'center' }}>
                    O Girus oferece dois formatos de laboratórios para diferentes objetivos de aprendizado. Escolha o que melhor se adapta às suas necessidades:
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={{ height: '100%', borderLeft: '4px solid #fdc43f', display: 'flex', flexDirection: 'column' }}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <BuildIcon style={{ fontSize: 40, color: '#fdc43f', marginRight: 16 }} />
                                <Typography variant="h5" gutterBottom style={{ margin: 0, fontWeight: 600 }}>
                                    Laboratórios Guiados
                                </Typography>
                            </Box>

                            <Typography variant="body1" paragraph>
                                <strong>Ideais para aprendizado passo a passo</strong> com instruções detalhadas e explicações.
                                Perfeitos para quem está começando ou deseja aprofundar conhecimentos sem pressão.
                            </Typography>

                            <Box bgcolor="rgba(253, 196, 63, 0.05)" p={2} borderRadius={1} mb={3}>
                                <Typography variant="h6" gutterBottom style={{ fontSize: '1rem', color: '#fdc43f' }}>
                                    Características:
                                </Typography>
                                <ul style={{ paddingLeft: '20px', marginTop: 0 }}>
                                    <li>Instruções passo a passo detalhadas</li>
                                    <li>Explicações de conceitos e comandos</li>
                                    <li>Validação automática de progresso</li>
                                    <li>Sem limite de tempo para conclusão</li>
                                    <li>Ideal para aprendizado inicial</li>
                                </ul>
                            </Box>

                            <Box mt="auto">
                                <Button
                                    component={RouterLink}
                                    to="/labs"
                                    variant="contained"
                                    color="primary"
                                    className={classes.ctaButton}
                                    fullWidth
                                >
                                    Explorar Laboratórios Guiados
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={{ height: '100%', borderLeft: '4px solid #FF5722', display: 'flex', flexDirection: 'column' }}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <EmojiEventsIcon style={{ fontSize: 40, color: '#FF5722', marginRight: 16 }} />
                                <Typography variant="h5" gutterBottom style={{ margin: 0, fontWeight: 600 }}>
                                    Laboratórios de Desafio
                                </Typography>
                            </Box>

                            <Typography variant="body1" paragraph>
                                <strong>Ideais para testar e validar conhecimentos</strong> em cenários reais com tempo limitado.
                                Perfeitos para profissionais que desejam avaliar suas habilidades sob pressão.
                            </Typography>

                            <Box bgcolor="rgba(255, 87, 34, 0.05)" p={2} borderRadius={1} mb={3}>
                                <Typography variant="h6" gutterBottom style={{ fontSize: '1rem', color: '#FF5722' }}>
                                    Características:
                                </Typography>
                                <ul style={{ paddingLeft: '20px', marginTop: 0 }}>
                                    <li>Problemas e cenários do mundo real</li>
                                    <li>Tempo limitado para conclusão</li>
                                    <li>Sem instruções passo a passo</li>
                                    <li>Resumo detalhado de desempenho</li>
                                    <li>Ideal para validar conhecimentos</li>
                                </ul>
                            </Box>

                            <Box mt="auto">
                                <Button
                                    component={RouterLink}
                                    to="/labs?filter=challenges"
                                    variant="contained"
                                    className={classes.challengeButton}
                                    fullWidth
                                >
                                    Iniciar Desafios
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                {/* Estatísticas */}
                <Typography variant="h5" className={classes.sectionTitle}>
                    Por que escolher o Girus?
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={6} md={3}>
                        <Box className={classes.statCard}>
                            <Typography className={classes.statNumber}>100%</Typography>
                            <Typography className={classes.statLabel}>Local</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box className={classes.statCard}>
                            <Typography className={classes.statNumber}>0</Typography>
                            <Typography className={classes.statLabel}>Configuração Complexa</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box className={classes.statCard}>
                            <Typography className={classes.statNumber}>∞</Typography>
                            <Typography className={classes.statLabel}>Laboratórios</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box className={classes.statCard}>
                            <Typography className={classes.statNumber}>∞</Typography>
                            <Typography className={classes.statLabel}>Possibilidades</Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Terminal e Validação */}
                <Typography variant="h5" className={classes.sectionTitle} style={{ marginTop: '48px' }}>
                    Terminal Interativo e Validação
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Terminal Interativo
                        </Typography>
                        <TerminalCommand
                            command="kubectl get pods -n kube-system"
                            output={`NAME                                      READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-74klj                  1/1     Running   0          5d
coredns-74ff55c5b-f5v7j                  1/1     Running   0          5d
etcd-kind-control-plane                  1/1     Running   0          5d
kube-apiserver-kind-control-plane        1/1     Running   0          5d
kube-controller-manager-kind-control-plane 1/1   Running   0          5d
kube-proxy-mqz9k                         1/1     Running   0          5d
kube-scheduler-kind-control-plane        1/1     Running   0          5d`}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Validação de Tarefas
                        </Typography>
                        <LabProgress
                            title="Laboratório de Kubernetes"
                            completedTasks={2}
                            totalTasks={5}
                            estimatedTimeMinutes={45}
                            isKubernetes={true}
                        />
                        <Box mt={2}>
                            <LinuxTip title="Dica" type="info">
                                Para expor um deployment como serviço, utilize o comando <code>kubectl expose deployment</code>
                            </LinuxTip>
                        </Box>
                    </Grid>
                </Grid>

                <div className={classes.contributionSection}>
                    <Divider className={classes.divider} />

                    <Typography variant="h5" className={classes.sectionTitle}>
                        <CodeIcon className={classes.icon} />
                        Projeto Open Source - Contribua!
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" gutterBottom>
                                    Faça Parte da Comunidade
                                </Typography>
                                <Typography paragraph>
                                    O GIRUS é um projeto open-source que depende da contribuição da comunidade para crescer. Existem várias formas de contribuir:
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Desenvolvimento</strong>
                                        </Typography>
                                        <Typography>
                                            Correção de bugs e melhorias no código-fonte, implementação de novos recursos, otimização de performance, e testes de qualidade.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Criação de Conteúdo</strong>
                                        </Typography>
                                        <Typography>
                                            Desenvolvimento de novos templates de laboratórios, tradução para outros idiomas, e elaboração de tutoriais e documentação.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Divulgação</strong>
                                        </Typography>
                                        <Typography>
                                            Compartilhamento do projeto nas redes sociais, apresentações em eventos e conferências, e artigos sobre uso e benefícios.
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box mt={3} display="flex" justifyContent="center">
                                    <Button
                                        variant="outlined"
                                        startIcon={<GitHubIcon />}
                                        href="https://github.com/linuxtips/girus"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classes.cardButton}
                                    >
                                        Ver no GitHub
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

                {/* FAQ Section */}
                <Typography variant="h5" className={classes.sectionTitle} style={{ marginTop: '48px' }}>
                    Perguntas Frequentes
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                O GIRUS funciona offline?
                            </Typography>
                            <Typography>
                                Sim, após a instalação inicial e download das imagens, o GIRUS pode funcionar completamente offline.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Quanto consome de recursos da minha máquina?
                            </Typography>
                            <Typography>
                                O GIRUS é otimizado para ser leve. Um cluster básico consome aproximadamente 1-2GB de RAM e requer cerca de 5GB de espaço em disco.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Posso criar laboratórios personalizados?
                            </Typography>
                            <Typography>
                                Absolutamente! O sistema de templates é flexível e permite a criação de laboratórios específicos para suas necessidades ou empresa.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Como faço para atualizar o GIRUS?
                            </Typography>
                            <Typography>
                                Execute o mesmo script de instalação novamente ou use <code>girus update</code> (disponível em versões mais recentes).
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box mt={4} display="flex" justifyContent="center">
                    <Button
                        component={RouterLink}
                        to="/labs"
                        variant="contained"
                        color="primary"
                        className={classes.ctaButton}
                    >
                        Explorar Laboratórios
                    </Button>
                </Box>

                {/* Add a new section for Girus Hub */}
                <Typography variant="h5" className={classes.sectionTitle} style={{ marginTop: '48px' }}>
                    <StorageIcon className={classes.icon} />
                    Girus Hub - Comunidade de Laboratórios
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Compartilhe e Descubra Laboratórios
                            </Typography>
                            <Typography paragraph>
                                O <strong className={classes.highlightText}>Girus Hub</strong> é um repositório comunitário para laboratórios técnicos, similar ao Docker Hub,
                                onde usuários podem publicar, descobrir e compartilhar seus próprios ambientes de aprendizado
                                com a comunidade global.
                            </Typography>
                            <Typography paragraph>
                                Amplie o ecossistema Girus através desta biblioteca colaborativa de experiências práticas:
                            </Typography>

                            <Box mt={3} mb={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box className={classes.featureCard} style={{ height: '100%' }}>
                                            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 600 }}>
                                                Publique Seus Laboratórios
                                            </Typography>
                                            <Typography variant="body2">
                                                Crie templates personalizados de laboratórios e compartilhe com a comunidade.
                                                Ajude outros profissionais a aprender as tecnologias que você domina.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box className={classes.featureCard} style={{ height: '100%' }}>
                                            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 600 }}>
                                                Descubra Novos Conhecimentos
                                            </Typography>
                                            <Typography variant="body2">
                                                Acesse uma biblioteca crescente de laboratórios criada pela comunidade,
                                                cobrindo diversas tecnologias e casos de uso do mundo real.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mt={3} display="flex" justifyContent="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.ctaButton}
                                    style={{ marginRight: '16px' }}
                                >
                                    Explorar o Girus Hub
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<GitHubIcon />}
                                    href="https://github.com/badtuxx/girus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.secondaryButton}
                                >
                                    Contribuir
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Lista de Laboratórios Disponíveis */}
                <Typography variant="h5" className={classes.sectionTitle} style={{ marginTop: '48px' }}>
                    Novos Laboratórios Disponíveis
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" style={{ color: '#fdc43f', marginBottom: '16px' }}>
                                AWS Services
                            </Typography>
                            <Typography paragraph>
                                <strong>S3 Storage:</strong> Crie buckets, gerencie objetos e configure propriedades de armazenamento usando o serviço S3 da AWS.
                            </Typography>
                            <Typography paragraph>
                                <strong>DynamoDB NoSQL:</strong> Trabalhe com bancos de dados NoSQL criando tabelas, inserindo dados e realizando consultas.
                            </Typography>
                            <Typography paragraph>
                                <strong>Lambda Serverless:</strong> Implemente funções Lambda e configure eventos para execução automatizada de código sem servidor.
                            </Typography>
                            <Box mt={2}>
                                <Chip
                                    label="LocalStack"
                                    size="small"
                                    style={{ backgroundColor: '#326CE5', color: 'white' }}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" style={{ color: '#fdc43f', marginBottom: '16px' }}>
                                Terraform IaC
                            </Typography>
                            <Typography paragraph>
                                <strong>Fundamentos:</strong> Aprenda os princípios básicos da infraestrutura como código com o Terraform.
                            </Typography>
                            <Typography paragraph>
                                <strong>AWS Infraestrutura:</strong> Provisione recursos na AWS usando Terraform para gerenciar redes, instâncias e storage.
                            </Typography>
                            <Typography paragraph>
                                <strong>Provisioners e Módulos:</strong> Domine provisioners para configuração e módulos para organizar seu código Terraform.
                            </Typography>
                            <Box mt={2}>
                                <Chip
                                    label="HCL"
                                    size="small"
                                    style={{ backgroundColor: '#7B42BC', color: 'white' }}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" style={{ color: '#fdc43f', marginBottom: '16px' }}>
                                Kubernetes Avançado
                            </Typography>
                            <Typography paragraph>
                                <strong>Serviços e Redes:</strong> Configure serviços para expor aplicações e entenda as redes do Kubernetes.
                            </Typography>
                            <Typography paragraph>
                                <strong>ConfigMaps e Secrets:</strong> Gerencie configurações e dados sensíveis para suas aplicações em contêineres.
                            </Typography>
                            <Typography paragraph>
                                <strong>CronJobs:</strong> Configure tarefas agendadas para automação de processos em seu cluster Kubernetes.
                            </Typography>
                            <Box mt={2}>
                                <Chip
                                    label="K8s"
                                    size="small"
                                    style={{ backgroundColor: '#326CE5', color: 'white' }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Botão de Desafios */}
                <Box mt={5} textAlign="center">
                    <Typography variant="h6" gutterBottom style={{ color: '#FF5722' }}>
                        Quer testar seus conhecimentos?
                    </Typography>
                    <Typography paragraph>
                        Experimente nossos novos desafios com tempo limitado para medir suas habilidades!
                    </Typography>
                    <Button
                        variant="contained"
                        className={classes.challengeButton}
                        startIcon={<EmojiEventsIcon />}
                    >
                        Desafios Práticos
                    </Button>
                </Box>

                <Box className={classes.footer}>
                    <Typography variant="body2">
                        Girus Labs - Criado e mantido pela LINUXtips
                    </Typography>
                    <Typography variant="body2">
                        <Link href="https://www.linuxtips.io" target="_blank" rel="noopener noreferrer" color="inherit">
                            www.linuxtips.io
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default DemoPage; 