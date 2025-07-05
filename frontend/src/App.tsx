import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LabWorkspace from './components/LabWorkspace';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/" component={LabWorkspace} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
