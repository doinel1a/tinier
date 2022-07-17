import { ReactNode, createContext, useContext } from 'react';

import useIsMobile from '../hooks/useIsMobile';
import useDarkMode from '../hooks/useDarkMode';

interface IContextProviderProps {
    isMobile: boolean;
    isDarkMode: boolean;
    toggleDarkMode: any;
}

const defaultProps: IContextProviderProps = {
    isMobile: false,
    isDarkMode: true,
    toggleDarkMode: null,
};

const StateContext: React.Context<IContextProviderProps> =
    createContext<IContextProviderProps>(defaultProps);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const { isMobile } = useIsMobile();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <StateContext.Provider
            value={{
                isMobile,
                isDarkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

const useStateContext = () => useContext(StateContext);
export default useStateContext;
