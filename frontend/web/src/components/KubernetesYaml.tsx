import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import '../styles/linuxtips-theme.css';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        backgroundColor: '#2d323b',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    header: {
        padding: theme.spacing(1, 2),
        backgroundColor: '#326CE5',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    fileName: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    yamlContent: {
        padding: theme.spacing(2),
        overflowX: 'auto',
        backgroundColor: '#282c34',
        color: '#e0e0e0',
        fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
        fontSize: '0.875rem',
        lineHeight: 1.6,
        '& pre': {
            margin: 0,
            whiteSpace: 'pre-wrap',
        },
    }
}));

interface KubernetesYamlProps {
    fileName: string;
    children: React.ReactNode;
}

const KubernetesYaml: React.FC<KubernetesYamlProps> = ({ fileName, children }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <div className={classes.header}>
                <img
                    src="/assets/images/kubernetes-logo.png"
                    alt="Kubernetes Logo"
                    style={{ width: '20px', height: '20px' }}
                />
                <Typography variant="subtitle1" className={classes.fileName}>
                    {fileName}
                </Typography>
            </div>
            <div className={classes.yamlContent}>
                <pre>{children}</pre>
            </div>
        </Paper>
    );
};

export default KubernetesYaml; 