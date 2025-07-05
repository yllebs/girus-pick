import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { marked } from 'marked';
import '../styles/linuxtips-theme.css';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        backgroundColor: '#2d323b',
        border: '1px solid rgba(255, 255, 255, 0.12)',
    },
    header: {
        padding: theme.spacing(1, 2),
        backgroundColor: '#FF9900',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    title: {
        fontWeight: 'bold',
        color: '#1c1e22',
    },
    content: {
        padding: theme.spacing(2),
        color: '#e0e0e0',
    }
}));

type TipType = 'tip' | 'info' | 'warning' | 'danger';

interface LinuxTipProps {
    title?: string;
    type?: TipType;
    children: React.ReactNode | string;
}

const LinuxTip: React.FC<LinuxTipProps> = ({
    title = 'Dica LINUXtips',
    type = 'tip',
    children
}) => {
    const classes = useStyles();

    // Configurações baseadas no tipo da dica
    const tipConfig = {
        tip: {
            color: '#FF9900',
            icon: '/assets/images/tux-logo.png',
            altText: 'Tux Logo'
        },
        info: {
            color: '#2196F3',
            icon: '/assets/images/tux-logo.png',
            altText: 'Tux Logo'
        },
        warning: {
            color: '#FFC107',
            icon: '/assets/images/tux-logo.png',
            altText: 'Tux Logo'
        },
        danger: {
            color: '#f44336',
            icon: '/assets/images/tux-logo.png',
            altText: 'Tux Logo'
        }
    };

    const config = tipConfig[type];

    // Processar o conteúdo como Markdown se for uma string
    const processedContent = typeof children === 'string'
        ? <div dangerouslySetInnerHTML={{ __html: marked(children) }} />
        : children;

    return (
        <Paper className={classes.root} elevation={2}>
            <div className={classes.header} style={{ backgroundColor: config.color }}>
                <img
                    src={config.icon}
                    alt={config.altText}
                    style={{ width: '24px', height: '24px' }}
                />
                <Typography variant="subtitle1" className={classes.title}>
                    {title}
                </Typography>
            </div>
            <div className={classes.content}>
                {processedContent}
            </div>
        </Paper>
    );
};

export default LinuxTip; 