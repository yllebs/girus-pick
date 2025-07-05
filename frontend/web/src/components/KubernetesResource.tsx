import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import '../styles/linuxtips-theme.css';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
        overflow: 'hidden',
        backgroundColor: '#2d323b',
    },
    header: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#326CE5',
    },
    resourceName: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    content: {
        padding: theme.spacing(2),
        overflowX: 'auto',
        backgroundColor: '#282c34',
        color: '#e0e0e0',
        fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
        fontSize: '0.875rem',
    }
}));

interface KubernetesResourceProps {
    kind: string;
    name: string;
    children: React.ReactNode;
}

const KubernetesResource: React.FC<KubernetesResourceProps> = ({ kind, name, children }) => {
    const classes = useStyles();

    return (
        <Paper className={`k8s-resource ${classes.root}`} elevation={2}>
            <div className={classes.header}>
                <Typography variant="subtitle1" className={classes.resourceName}>
                    <span className="k8s-resource-type">{kind}</span>: {name}
                </Typography>
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </Paper>
    );
};

KubernetesResource.propTypes = {
    kind: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default KubernetesResource; 