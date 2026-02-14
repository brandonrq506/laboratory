import { Card, HeadingLarge } from "@/components/layout";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { resolveRedirectPath, validateRedirectSearch } from "@/utils/search";
import { LoginForm } from "@/features/auth/components";

const TIMER_PATH = "/timer";

interface LoginSearch {
  redirect?: string;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search): LoginSearch => validateRedirectSearch(search),
  beforeLoad: ({ context, search }) => {
    const redirectPath = resolveRedirectPath(search.redirect, TIMER_PATH);

    if (context.auth.isAuth) {
      throw redirect({ href: redirectPath });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const redirectPath = resolveRedirectPath(search.redirect, TIMER_PATH);

  const handleLoginSuccess = async () => {
    await router.invalidate();
    await navigate({ href: redirectPath });
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 sm:px-0">
      <Card className="min-h-fit w-full sm:max-w-lg">
        <HeadingLarge title="Login" />
        <br />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Card>
    </div>
  );
}
