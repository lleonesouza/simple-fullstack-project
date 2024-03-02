import { ReactNode, createContext, useContext, useReducer } from "react";
import { ActionMethods, User } from "../@types";
import { useActions } from "./actions";

const initialState: User[] = [];

export const UsersContext = createContext<{ state: User[], actions?: ActionMethods }>({ state: initialState });

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, actions } = useActions();
  return (
    <UsersContext.Provider value={{ state, actions }}>
      {children}
    </UsersContext.Provider>
  );
}


