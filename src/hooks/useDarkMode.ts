import { useState, useEffect } from 'react';

interface IUseDarkModeOutput {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const THEME_KEY = 'USE_DARK_MODE_?';

const useDarkMode = (): IUseDarkModeOutput => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    useEffect(() => {
        if (!localStorage.getItem(THEME_KEY)) {
            const theme = themePreference();

            localStorage.setItem(THEME_KEY, JSON.stringify(theme));
            setIsDarkMode(theme);
        }

        setIsDarkMode(
            localStorage.getItem(THEME_KEY) === 'true' ? true : false
        );
    }, []);

    useEffect(() => {
        localStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return {
        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((prevState) => !prevState),
    };
};

function themePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default useDarkMode;
