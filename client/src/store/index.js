import { createContext, useContext } from "react";

export const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
