import { useAuth } from "@/features/auth/stores";

import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="login" replace />;
};
