import { Card, HeadingLarge } from "@/components/layout";
import {
  NavigateOptions,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/components";
import { validateRedirectSearch } from "@/utils/search";

const TIMER_PATH: NavigateOptions["to"] = "/timer";

interface LoginSearch {
  redirect?: string;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search): LoginSearch => validateRedirectSearch(search),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuth) {
      throw redirect({ to: search.redirect ?? TIMER_PATH });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const redirectPath = search.redirect ?? TIMER_PATH;

  const handleLoginSuccess = async () => {
    await router.invalidate();
    await navigate({ to: redirectPath });
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
