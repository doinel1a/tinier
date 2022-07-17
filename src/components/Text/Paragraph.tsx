import useStateContext from '../../context/ContextProvider';

const Paragraph: React.FC<{ text: string; customCss?: string }> = ({
    text,
    customCss,
}) => {
    const { isDarkMode } = useStateContext();

    return (
        <p
            className={`
                md:text-lg lg:text-xl transition-colors
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''} 
            `}
        >
            {text}
        </p>
    );
};

export default Paragraph;
