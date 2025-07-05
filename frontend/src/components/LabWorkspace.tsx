import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@material-ui/core';
import LabTerminal from './Terminal';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        height: '100%',
    },
    terminal: {
        height: 'calc(100vh - 200px)',
        backgroundColor: '#1e1e1e',
    },
    instructions: {
        height: '100%',
        overflow: 'auto',
    },
}));

interface Task {
    name: string;
    description: string;
    steps: string[];
}

const LabWorkspace: React.FC = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [labInfo, setLabInfo] = useState<{
        podName: string;
        namespace: string;
        tasks: Task[];
    } | null>(null);

    useEffect(() => {
        const fetchLabInfo = async () => {
            try {
                const response = await axios.get('/api/v1/labs/current');
                setLabInfo(response.data);
            } catch (error) {
                console.error('Erro ao carregar informações do laboratório:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLabInfo();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (!labInfo) {
        return (
            <Typography variant="h6" color="error">
                Erro ao carregar o laboratório
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Terminal
                        </Typography>
                        <Divider />
                        <div className={classes.terminal}>
                            <LabTerminal
                                podName={labInfo.podName}
                                namespace={labInfo.namespace}
                            />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Instruções
                        </Typography>
                        <Divider />
                        <div className={classes.instructions}>
                            <List>
                                {labInfo.tasks.map((task, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={task.name}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        {task.description}
                                                    </Typography>
                                                    <List>
                                                        {task.steps.map((step, stepIndex) => (
                                                            <ListItem key={stepIndex} dense>
                                                                <ListItemText primary={`${stepIndex + 1}. ${step}`} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default LabWorkspace;
