import useStateContext from '../context/ContextProvider';

import Paragraph from './Text/Paragraph';

const Footer = () => {
    const { isDarkMode } = useStateContext();

    return (
        <footer
            className={` 
                w-full h-10 flex justify-center items-center transition-colors  cursor-default
                ${isDarkMode ? 'bg-b-primary-dark' : 'bg-b-primary-light'}
            `}
        >
            <Paragraph text='© 2022 — D1A' />
        </footer>
    );
};

export default Footer;
