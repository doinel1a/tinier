import Link from 'next/link';

import useStateContext from '../context/ContextProvider';

const Logo: React.FC<{ text: string; ariaLabel: string }> = ({
    text,
    ariaLabel,
}) => {
    const { isDarkMode } = useStateContext();
    return (
        <Link href='/'>
            <span
                aria-label={ariaLabel}
                tabIndex={0}
                className={`
                    text-xl md:text-2xl lg:text-3xl font-bold cursor-pointer transition-colors
                    ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                `}
            >
                {text}
            </span>
        </Link>
    );
};

export default Logo;
