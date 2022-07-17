import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStateContext from '../../context/ContextProvider';

import Span from '../Text/Span';

const ButtonSecondary: React.FC<{
    type: 'button' | 'submit';
    text: string;
    icon?: IconProp;
    spanCss?: string;
    iconCss?: string;
    stateCss?: string;
    onClick?: MouseEventHandler;
}> = ({ type, text, icon, spanCss, iconCss, stateCss, onClick }) => {
    const { isDarkMode } = useStateContext();

    return (
        <button
            type={type}
            className={`
                btn border bg-transparent group
                ${isDarkMode ? 'border-white' : 'border-black'}
                ${stateCss ? stateCss : 'hover:bg-gray-400 focus:bg-gray-400'}
            `}
            onClick={onClick}
        >
            {icon ? (
                <FontAwesomeIcon
                    icon={icon}
                    className={`
                        w-4 md:w-5 lg:w-6 mr-2 transition-colors
                        ${
                            isDarkMode
                                ? 'text-primary-dark'
                                : 'text-primary-light'
                        }
                        ${iconCss ? iconCss : ''}
                    `}
                />
            ) : (
                <></>
            )}
            <Span text={text} customCss={spanCss ? spanCss : ''} />
        </button>
    );
};

export default ButtonSecondary;
