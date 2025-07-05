import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        backgroundColor: '#2d323b',
        borderRadius: '4px',
        overflow: 'hidden',
        borderLeft: '4px solid #fdc43f',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        backgroundColor: '#303540',
    },
    title: {
        color: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: theme.spacing(1),
            color: '#FF0000',
        }
    },
    videoContainer: {
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    }
}));

interface YouTubePlayerProps {
    videoUrl: string;
    onClose?: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl, onClose }) => {
    const classes = useStyles();

    // Extract video ID from YouTube URL
    const getYouTubeVideoId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
        return null;
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="subtitle1" className={classes.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    Vídeo Complementar
                </Typography>
                {onClose && (
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}
            </div>
            <div className={classes.videoContainer}>
                <iframe
                    className={classes.iframe}
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </Paper>
    );
};

export default YouTubePlayer; 