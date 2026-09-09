import { Card } from "@/components/layout";
import { LinkButton } from "@/components/core";

export const NotFoundPage = () => {
  return (
    <Card className="grid min-h-dvh place-items-center py-32">
      <div className="text-center">
        <p className="text-accent text-4xl font-semibold">404</p>
        <h1 className="text-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Page not found
        </h1>
        <div className="text-foreground-subtle mt-6 text-lg font-light text-pretty sm:text-xl/8">
          <p>Sorry, we couldn't find the page you're looking for</p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <LinkButton to="/">Go back home</LinkButton>
        </div>
      </div>
    </Card>
  );
};
