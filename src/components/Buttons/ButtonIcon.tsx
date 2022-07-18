import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStateContext from '../../context/ContextProvider';

const ButtonIcon: React.FC<{
    type: 'button' | 'submit';
    icon: IconProp;
    title?: string;
    ariaLabel: string;
    iconCss?: string;
    stateCss?: string;
    onClick?: MouseEventHandler;
}> = ({ type, icon, title, ariaLabel, stateCss, iconCss, onClick }) => {
    const { isDarkMode } = useStateContext();

    return (
        <button
            type={type}
            title={title}
            aria-label={ariaLabel}
            className={`
                p-1 rounded-full transition-colors
                ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}
                ${stateCss ? stateCss : ''}
            `}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={icon}
                className={`
                    w-5 md:w-6 lg:w-7
                    ${iconCss ? iconCss : ''}
                `}
            />
        </button>
    );
};

export default ButtonIcon;
