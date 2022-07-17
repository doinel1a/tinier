import useStateContext from '../../context/ContextProvider';

const Span: React.FC<{ text: string; customCss?: string }> = ({
    text,
    customCss,
}) => {
    const { isDarkMode } = useStateContext();

    return (
        <span
            className={`
                text-sm md:text-base lg:text-lg font-medium transition-colors
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''} 
            `}
        >
            {text}
        </span>
    );
};

export default Span;
