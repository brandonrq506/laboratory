import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  SignalSlashIcon,
} from "@heroicons/react/24/outline";
import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/core";
import clsx from "clsx";
import { getRouteErrorPageContent } from "./utils/getRouteErrorPageContent";

export const RouteErrorPage = ({ error }: ErrorComponentProps) => {
  const router = useRouter();
  const content = getRouteErrorPageContent(error, navigator.onLine);
  const isNetworkError = content.kind === "network";

  return (
    <main className="bg-background grid min-h-dvh place-items-center px-6 py-24 sm:py-32">
      <section
        className="w-full max-w-lg text-center"
        aria-labelledby="route-error-title">
        <div
          className={clsx(
            "mx-auto flex size-16 items-center justify-center rounded-full",
            isNetworkError ? "bg-accent-subtle" : "bg-danger-subtle",
          )}>
          {isNetworkError ? (
            <SignalSlashIcon className="text-accent size-8" aria-hidden />
          ) : (
            <ExclamationTriangleIcon
              className="text-danger-text size-8"
              aria-hidden
            />
          )}
        </div>

        <p
          className={clsx(
            "mt-6 text-sm font-semibold tracking-wide uppercase",
            isNetworkError ? "text-accent" : "text-danger-text",
          )}>
          {content.label}
        </p>
        <h1
          id="route-error-title"
          className="text-foreground mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {content.title}
        </h1>
        <p className="text-foreground-subtle mt-6 text-lg/8 text-pretty">
          {content.description}
        </p>

        <div className="mt-10">
          <Button
            size="xl"
            startIcon={<ArrowPathIcon className="size-5" aria-hidden />}
            onClick={() => void router.invalidate()}>
            Try again
          </Button>
        </div>
      </section>
    </main>
  );
};
