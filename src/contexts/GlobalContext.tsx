import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

interface GlobalContextProps {
  isShortcutDialogVisible: boolean;
  setIsShortcutDialogVisible: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext({} as GlobalContextProps);
  
export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isShortcutDialogVisible, setIsShortcutDialogVisible] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isShortcutDialogVisible,
        setIsShortcutDialogVisible,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};