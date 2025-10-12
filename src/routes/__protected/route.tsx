import { createFileRoute, redirect } from "@tanstack/react-router";
import { MainLayout } from "@/components/layout";

export const Route = createFileRoute("/__protected")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuth) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout />;
}
