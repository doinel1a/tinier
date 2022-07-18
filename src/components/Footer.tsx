import useStateContext from '../context/ContextProvider';

import Paragraph from './Text/Paragraph';

const Footer = () => {
    const { isDarkMode } = useStateContext();

    return (
        <footer
            className={` 
                w-full h-[var(--footer-h)] fixed bottom-0 flex justify-center items-center transition-colors  cursor-default
                ${isDarkMode ? 'bg-primary-dark' : 'bg-primary-light'}
            `}
        >
            <Paragraph text='© 2022 — D1A' />
        </footer>
    );
};

export default Footer;
