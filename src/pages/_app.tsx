import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

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

function getBaseUrl() {
    if (process.browser) return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
    config() {
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            url,
        };
    },
})(App);
