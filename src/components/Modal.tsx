import {
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useEffect,
    useRef,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

import useStateContext from '../context/ContextProvider';

import ButtonPrimary from './Buttons/ButtonPrimary';
import Paragraph from './Text/Paragraph';
import ButtonSecondary from './Buttons/ButtonSecondary';

interface IModalProps {
    isModalVisible: boolean;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

interface FocusEvent<T = Element> extends SyntheticEvent<T> {
    relatedTarget: Node | null;
    target: EventTarget & T;
}

const Modal: React.FC<IModalProps> = ({
    isModalVisible,
    setIsModalVisible,
}) => {
    const { isDarkMode } = useStateContext();
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        isModalVisible
            ? document.body.classList.add('overflow-hidden')
            : document.body.classList.remove('overflow-hidden');
    }, [isModalVisible]);

    const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
        modalRef.current?.setAttribute('tabindex', '0');

        if (!modalRef.current?.contains(e.relatedTarget))
            modalRef.current?.focus();
    };

    return (
        <div
            className={`relative z-10 ${isModalVisible ? 'block' : 'hidden'}`}
            aria-labelledby='modal-title'
            role='dialog'
            aria-modal='true'
        >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

            <div
                ref={modalRef}
                onBlur={handleFocus}
                className='fixed z-10 inset-0 overflow-y-auto'
            >
                <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
                    <div
                        className={`relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full ${
                            isDarkMode
                                ? 'bg-b-primary-dark'
                                : 'bg-b-primary-light'
                        }`}
                    >
                        <div
                            className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4  ${
                                isDarkMode
                                    ? 'bg-b-primary-dark'
                                    : 'bg-b-primary-light'
                            }`}
                        >
                            <div className='sm:flex sm:items-start'>
                                <div className='w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 mx-auto flex-shrink-0 flex items-center justify-center rounded-full bg-red-100 sm:mx-0'>
                                    <FontAwesomeIcon
                                        icon={faWarning}
                                        className='w-7 md:w-8 lg:w-9 h-7 md:h-8 lg:h-9 text-red-600'
                                    />
                                </div>
                                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                    <Paragraph
                                        text='Deactivate account'
                                        customCss='text-lg md:text-xl lg:text-2xl font-medium '
                                    />
                                    <div className='mt-2'>
                                        <Paragraph
                                            text='Are you sure you want to deactivate
                                            your account? All of your data will
                                            be permanently removed. This action
                                            cannot be undone.'
                                            customCss={`${
                                                isDarkMode
                                                    ? 'text-gray-50'
                                                    : 'text-gray-800'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row-reverse border-2 gap-x-4 gap-y-2 px-4 py-3 sm:px-5 bg-gray-300'>
                            <ButtonPrimary
                                type='button'
                                text='Deactivate'
                                stateCss='w-full sm:w-auto bg-red-500 hover:bg-red-700 focus:bg-red-700'
                                onClick={() =>
                                    setIsModalVisible((prevState) => !prevState)
                                }
                            />
                            <ButtonSecondary
                                type='button'
                                text='Cancel'
                                stateCss='w-full sm:w-auto bg-white'
                                onClick={() =>
                                    setIsModalVisible((prevState) => !prevState)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
