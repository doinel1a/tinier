import type { AppProps } from 'next/app';

import { ContextProvider } from '../context/ContextProvider';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ContextProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ContextProvider>
    );
};

export default App;
