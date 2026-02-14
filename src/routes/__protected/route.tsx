import { createFileRoute, redirect } from "@tanstack/react-router";
import { MainLayout } from "@/components/layout";
import { resolveRedirectPath } from "@/utils/search";

const LOGIN_PATH = "/login";
const REDIRECT_FALLBACK_PATH = "/timer";

export const Route = createFileRoute("/__protected")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuth) {
      const redirectPath = resolveRedirectPath(
        location.href,
        REDIRECT_FALLBACK_PATH,
      );

      throw redirect({
        to: LOGIN_PATH,
        search: {
          redirect: redirectPath,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout />;
}
