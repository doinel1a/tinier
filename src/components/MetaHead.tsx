import Head from 'next/head';

import defaultMetaTags, { appHostname } from '../config/defaultMetaTags';

interface IMetaHeadProps {
    name?: string;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const MetaHead: React.FC<IMetaHeadProps> = ({
    name,
    title,
    description,
    image,
    url,
}) => {
    return (
        <Head>
            <title>{title || defaultMetaTags.title}</title>

            <meta
                name='viewport'
                content='width=device-width, initial-scale=1, shrink-to-fit=no'
            />
            <meta
                name='description'
                content={description || defaultMetaTags.description}
            />
            <meta name='keywords' content='KEYWORDS' />
            <meta
                name='author'
                content='Doinel Atanasiu - doinel1atanasiu@gmail.com'
            />
            <meta
                name='copyright'
                content='Doinel Atanasiu - doinel1atanasiu@gmail.com'
            />
            <meta name='robots' content='noindex, nofollow' />
            <meta name='rating' content='general' />

            {/* Open Graph */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content={url || appHostname} />
            <meta name='twitter:creator' content='@AtanasiuDoinel' />
            <meta
                name='twitter:title'
                content={title || defaultMetaTags.title}
            />
            <meta
                name='twitter:description'
                content={description || defaultMetaTags.description}
            />
            <meta
                name='twitter:image'
                content={image || defaultMetaTags.image}
            />
            <meta property='og:url' content={url || appHostname} />
            <meta
                property='og:title'
                content={title || defaultMetaTags.title}
            />
            <meta
                property='og:description'
                content={description || defaultMetaTags.description}
            />
            <meta
                property='og:image'
                content={image || defaultMetaTags.image}
            />

            {/* Manifest */}
            <link rel='manifest' href='/manifest.json' />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta
                name='application-name'
                content={name || defaultMetaTags.name}
            />
            <meta
                name='apple-mobile-web-app-title'
                content={title || defaultMetaTags.title}
            />
            <meta name='theme-color' content='#0063EB' />
            <meta name='msapplication-navbutton-color' content='#0063EB' />
            <meta
                name='apple-mobile-web-app-status-bar-style'
                content='black-translucent'
            />
            <meta name='msapplication-starturl' content='/' />

            {/* Favicon - Generics */}
            <link rel='icon' href='/favicon/favicon-32.png' sizes='32x32' />
            <link rel='icon' href='/favicon/favicon-57.png' sizes='57x57' />
            <link rel='icon' href='/favicon/favicon-76.png' sizes='76x76' />
            <link rel='icon' href='/favicon/favicon-96.png' sizes='96x96' />
            <link rel='icon' href='/favicon/favicon-128.png' sizes='128x128' />
            <link rel='icon' href='/favicon/favicon-192.png' sizes='192x192' />
            <link rel='icon' href='/favicon/favicon-228.png' sizes='228x228' />

            {/* Favicon - Android */}
            <link
                rel='shortcut icon'
                sizes='196x196'
                href='/favicon/favicon-196.png'
            />

            {/* Favicon - iOS */}
            <link
                rel='apple-touch-icon'
                href='/favicon/favicon-120.png'
                sizes='120x120'
            />
            <link
                rel='apple-touch-icon'
                href='/favicon/favicon-152.png'
                sizes='152x152'
            />
            <link
                rel='apple-touch-icon'
                href='/favicon/favicon-180.png'
                sizes='180x180'
            />
        </Head>
    );
};

export default MetaHead;
