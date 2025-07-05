import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
import '../styles/linuxtips-theme.css';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#2d323b',
        borderLeft: '4px solid #326CE5',
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    description: {
        color: '#e0e0e0',
        marginBottom: theme.spacing(2),
    },
    metadataItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        color: '#b0b0b0',
    },
    metadataLabel: {
        fontWeight: 'bold',
        marginRight: theme.spacing(1),
        color: '#e0e0e0',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    k8sIcon: {
        width: '64px',
        height: '64px',
    }
}));

interface KubernetesLabHeaderProps {
    title: string;
    description: string;
    difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
    duration: string;
    version: string;
}

const KubernetesLabHeader: React.FC<KubernetesLabHeaderProps> = ({
    title,
    description,
    difficulty,
    duration,
    version,
}) => {
    const classes = useStyles();

    // Mapeamento de dificuldade para cor
    const difficultyColor = {
        'Iniciante': '#4CAF50',
        'Intermediário': '#FFC107',
        'Avançado': '#F44336',
    };

    return (
        <Paper className={classes.root} elevation={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={2} className={classes.iconContainer}>
                    <img
                        src="/assets/images/kubernetes-logo.png"
                        alt="Kubernetes Logo"
                        className={classes.k8sIcon}
                    />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4" className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className={classes.metadataItem}>
                        <span className={classes.metadataLabel}>Dificuldade:</span>
                        <span style={{ color: difficultyColor[difficulty] }}>{difficulty}</span>
                    </div>
                    <div className={classes.metadataItem}>
                        <span className={classes.metadataLabel}>Duração estimada:</span>
                        <span>{duration}</span>
                    </div>
                    <div className={classes.metadataItem}>
                        <span className={classes.metadataLabel}>Versão do Kubernetes:</span>
                        <span>{version}</span>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default KubernetesLabHeader; 