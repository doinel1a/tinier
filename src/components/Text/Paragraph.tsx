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
                ${isDarkMode ? 'text-color-dark' : 'text-color-light'}
                ${customCss ? customCss : ''} 
            `}
        >
            {text}
        </p>
    );
};

export default Paragraph;
