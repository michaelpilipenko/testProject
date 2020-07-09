import React from 'react';
import { Provider } from 'react-redux'
import { useStore } from '../src/store'
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from "../src/components/Layout";

export default function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <React.Fragment>
                <Head>
                    <title>My page</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>
                <Layout>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </Layout>
            </React.Fragment>
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
