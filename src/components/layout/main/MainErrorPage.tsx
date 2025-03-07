import { isRouteErrorResponse, useRouteError } from "react-router";
import { HomeIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/core";

export const MainErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            {error.status}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            {error.statusText}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {error.data}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LinkButton
              to="/"
              size="xl"
              startIcon={<HomeIcon aria-hidden className="size-5" />}>
              Go back home
            </LinkButton>
          </div>
        </div>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Oops!</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            {error.message}
          </h1>
          <p>
            <pre>{error.stack}</pre>
          </p>
          <p>{error.name}</p>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            This issue will be reported to our support team. Please try again
            later.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LinkButton
              to="/"
              size="xl"
              startIcon={<HomeIcon aria-hidden className="size-5" />}>
              Go back home
            </LinkButton>
          </div>
        </div>
      </main>
    );
  }
};
