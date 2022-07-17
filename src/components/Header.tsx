import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import useStateContext from '../context/ContextProvider';

import Logo from './Logo';
import ButtonIcon from './Buttons/ButtonIcon';

const Header: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useStateContext();

    return (
        <header
            className={`
                w-full h-14 sticky top-0 flex justify-center px-2 transition-colors
                ${isDarkMode ? 'bg-b-primary-dark' : 'bg-b-primary-light'}
            `}
        >
            <div className='h-full container flex items-center'>
                <nav className='mr-auto'>
                    <Logo text='<D1A />' ariaLabel='Homepage' />
                </nav>
                <ButtonIcon
                    type='button'
                    icon={isDarkMode ? faSun : faMoon}
                    ariaLabel={
                        isDarkMode
                            ? 'Set website in light mode'
                            : 'Set website in dark mode'
                    }
                    iconCss={`${
                        isDarkMode ? 'text-amber-200' : 'text-amber-500'
                    }`}
                    onClick={toggleDarkMode}
                />
            </div>
        </header>
    );
};

export default Header;
