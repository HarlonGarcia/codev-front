import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useState,
} from 'react';

import dayjs from 'dayjs';
import i18next from 'i18next';

interface GlobalContextProps {
    isShortcutDialogVisible: boolean;
    setIsShortcutDialogVisible: Dispatch<SetStateAction<boolean>>;
    changeLanguage: () => void;
}

export const GlobalContext = createContext({} as GlobalContextProps);
  
export const GlobalProvider = ({ children }: PropsWithChildren) => {
    const [isShortcutDialogVisible, setIsShortcutDialogVisible] = useState(false);

    const handleLanguageChange = (value: string) => {
        dayjs.locale(value);
        i18next.changeLanguage(value);
    };

    const changeLanguage = () => {
        const currentLanguage = i18next.resolvedLanguage;
    
        if ('en' === currentLanguage) {
            handleLanguageChange('pt-BR');
            return;
        }

        handleLanguageChange('en');
    };

    return (
        <GlobalContext.Provider
            value={{
                isShortcutDialogVisible,
                setIsShortcutDialogVisible,
                changeLanguage,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};