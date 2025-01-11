import { Card, PageHeader } from "@/components/layout";
import { LoginForm } from "@/features/auth";

export const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center px-4 sm:px-0">
      <Card className="h-1/3 w-full sm:max-w-lg">
        <PageHeader title="Login" />
        <br />
        <LoginForm />
      </Card>
    </div>
  );
};
