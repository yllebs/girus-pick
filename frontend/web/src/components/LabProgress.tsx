import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Paper } from '@material-ui/core';
import '../styles/linuxtips-theme.css';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        backgroundColor: '#2d323b',
    },
    title: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
        color: '#e0e0e0',
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    progressItem: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    progressBar: {
        position: 'relative',
        height: '8px',
        width: '100%',
        backgroundColor: '#1c1e22',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    completedBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#FF9900',
        borderRadius: '4px',
        transition: 'width 0.3s ease-in-out',
    },
    k8sBar: {
        backgroundColor: '#326CE5',
    },
    progressText: {
        fontWeight: 'bold',
        color: '#e0e0e0',
        minWidth: '48px',
        textAlign: 'right',
    },
    metadataContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
        color: '#b0b0b0',
    }
}));

interface ProgressProps {
    title: string;
    completedTasks: number;
    totalTasks: number;
    estimatedTimeMinutes: number;
    isKubernetes?: boolean;
}

const LabProgress: React.FC<ProgressProps> = ({
    title,
    completedTasks,
    totalTasks,
    estimatedTimeMinutes,
    isKubernetes = false,
}) => {
    const classes = useStyles();
    const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Paper className={classes.root} elevation={2}>
            <Typography variant="h6" className={classes.title}>
                {title}
            </Typography>

            <div className={classes.progressContainer}>
                <div className={classes.progressItem}>
                    <Box className={classes.progressBar}>
                        <Box
                            className={`${classes.completedBar} ${isKubernetes ? classes.k8sBar : ''}`}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </Box>
                    <span className={classes.progressText}>
                        {Math.round(progressPercent)}%
                    </span>
                </div>
            </div>

            <div className={classes.metadataContainer}>
                <div>
                    <strong>Tarefas:</strong> {completedTasks}/{totalTasks}
                </div>
                <div>
                    <strong>Tempo estimado:</strong> {estimatedTimeMinutes} min
                </div>
            </div>
        </Paper>
    );
};

export default LabProgress; 