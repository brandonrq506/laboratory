import { Card } from "@/components/layout";
import { LinkButton } from "@/components/core";
import { useLocation } from "react-router";

export const NotFoundPage = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Card className="grid min-h-full place-items-center py-32">
      <div className="text-center">
        <p className="text-4xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <div className="mt-6 text-lg font-light text-pretty text-gray-500 sm:text-xl/8">
          <p>Sorry, we couldn't find the page you're looking for:</p>
          <p>{path}</p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <LinkButton to="/">Go back home</LinkButton>
        </div>
      </div>
    </Card>
  );
};
