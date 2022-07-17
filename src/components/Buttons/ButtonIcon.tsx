import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStateContext from '../../context/ContextProvider';

const ButtonIcon: React.FC<{
    type: 'button' | 'submit';
    icon: IconProp;
    ariaLabel: string;
    iconCss?: string;
    stateCss?: string;
    onClick?: MouseEventHandler;
}> = ({ type, icon, ariaLabel, stateCss, iconCss, onClick }) => {
    const { isDarkMode } = useStateContext();

    return (
        <button
            type={type}
            aria-label={ariaLabel}
            className={`
                p-1 rounded-full
                ${isDarkMode ? '' : ''}
                ${stateCss ? stateCss : ''}
            `}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={icon}
                className={`
                    w-6 md:w-7 lg:w-8 text-3xl lg:text-4xl
                    ${iconCss ? iconCss : ''}
                `}
            />
        </button>
    );
};

export default ButtonIcon;
