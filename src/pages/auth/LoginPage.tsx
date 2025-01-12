import { useAuth } from "@/features/auth/stores";

import { Card, PageHeader } from "@/components/layout";
import { LoginForm } from "@/features/auth/components";
import { Navigate } from "react-router";

export const LoginPage = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center px-4 sm:px-0">
      <Card className="min-h-fit w-full sm:max-w-lg">
        <PageHeader title="Login" />
        <br />
        <LoginForm />
      </Card>
    </div>
  );
};
