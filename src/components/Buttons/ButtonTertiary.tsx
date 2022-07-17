import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStateContext from '../../context/ContextProvider';

import Span from '../Text/Span';

const ButtonTertiary: React.FC<{
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
                btn flex bg-transparent group
                ${stateCss ? stateCss : ''}
            `}
            onClick={onClick}
        >
            {icon ? (
                <FontAwesomeIcon
                    icon={icon}
                    className={`
                        w-4 md:w-5 lg:w-6 mr-2
                        text-blue-600 group-hover:text-blue-800 group-focus:text-blue-800 transition-colors
                        ${iconCss ? iconCss : ''}
                    `}
                />
            ) : (
                <></>
            )}
            <Span
                text={text}
                customCss={`
                    font-medium text-blue-600 group-hover:text-blue-800 group-focus:text-blue-800
                    ${spanCss ? spanCss : ''}
                `}
            />
        </button>
    );
};

export default ButtonTertiary;
