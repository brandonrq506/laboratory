import { Card } from "@/components/layout";
import { LinkButton } from "@/components/core";
import type { NotFoundRouteProps } from "@tanstack/react-router";
import { getNotFoundPageContent } from "./utils/getNotFoundPageContent";

export const NotFoundPage = ({ data }: NotFoundRouteProps) => {
  const content = getNotFoundPageContent(data);

  return (
    <Card className="grid min-h-dvh place-items-center py-32">
      <div className="text-center">
        <p className="text-accent text-4xl font-semibold">404</p>
        <h1 className="text-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          {content.title}
        </h1>
        <div className="text-foreground-subtle mt-6 text-lg font-light text-pretty sm:text-xl/8">
          <p>{content.description}</p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <LinkButton to="/">Go back home</LinkButton>
        </div>
      </div>
    </Card>
  );
};
