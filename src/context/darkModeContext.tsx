import React, { createContext, useReducer, ReactNode } from "react";
import DarkModeReducer, { State, Action } from "./darkModeReducer";

interface DarkModeContextProps {
  darkMode: boolean;
  dispatch: React.Dispatch<Action>;
}

const INITIAL_STATE: State = {
  darkMode: false,
};

export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: INITIAL_STATE.darkMode,
  dispatch: () => null,
});

interface DarkModeContextProviderProps {
  children: ReactNode;
}

export const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);
  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
