import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./AuthContextType";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Need a UserProvider");
  }
  return context;
};
