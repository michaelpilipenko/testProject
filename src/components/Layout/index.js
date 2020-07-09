import React from 'react';
import Header from './Header';
import Footer from "./Footer";
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
    orange,
    lightBlue,
    deepPurple,
    deepOrange
} from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
    },
}));

const Layout = ({children}) => {
    const classes = useStyles();
    const [darkState, setDarkState] = React.useState(false);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? orange[400] : lightBlue[500];
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    });

    const handleThemeChange = () => {
        setDarkState(!darkState);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <Header handleThemeChange={handleThemeChange} darkTheme={darkState}/>
                <Container component="main" className={classes.main} maxWidth="md">
                    {children}
                </Container>
                <Footer/>
            </div>
        </ThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;