import { ArrowPathIcon, SignalSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/core";
import { useRouter } from "@tanstack/react-router";

export const RouteErrorPage = () => {
  const router = useRouter();

  return (
    <main className="bg-background grid min-h-dvh place-items-center px-6 py-24 sm:py-32">
      <section
        className="w-full max-w-lg text-center"
        aria-labelledby="route-error-title">
        <div className="bg-accent-subtle mx-auto flex size-16 items-center justify-center rounded-full">
          <SignalSlashIcon className="text-accent size-8" aria-hidden />
        </div>

        <p className="text-accent mt-6 text-sm font-semibold tracking-wide uppercase">
          Connection error
        </p>
        <h1
          id="route-error-title"
          className="text-foreground mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          We couldn't load this page
        </h1>
        <p className="text-foreground-subtle mt-6 text-lg/8 text-pretty">
          Check your internet connection and try again. The service may be
          temporarily unavailable.
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
