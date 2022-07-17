import useStateContext from '../../context/ContextProvider';

const Heading: React.FC<{ type: string; text: string; customCss?: string }> = ({
    type,
    text,
    customCss,
}) => {
    const { isDarkMode } = useStateContext();

    return type === 'h1' ? (
        <h1
            className={`
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''}
            `}
        >
            {text}
        </h1>
    ) : type === 'h2' ? (
        <h2
            className={`
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''}
            `}
        >
            {text}
        </h2>
    ) : type === 'h3' ? (
        <h3
            className={`
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''}
            `}
        >
            {text}
        </h3>
    ) : type === 'h4' ? (
        <h4
            className={`
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''}
            `}
        >
            {text}
        </h4>
    ) : type === 'h5' ? (
        <h5
            className={`
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''}
            `}
        >
            {text}
        </h5>
    ) : type === 'h6' ? (
        <h6
            className={`
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${customCss ? customCss : ''}
            `}
        >
            {text}
        </h6>
    ) : (
        <></>
    );
};

export default Heading;
