import {
  NavigateOptions,
  useCanGoBack,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useCallback } from "react";

interface UseNavigateBackOptions {
  fallback: NavigateOptions["to"];
  replace?: boolean;
  onFallback?: () => void;
}

export const useNavigateBack = ({
  fallback,
  replace = true,
  onFallback,
}: UseNavigateBackOptions) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  return useCallback(() => {
    if (canGoBack) {
      router.history.back();
      return;
    }
    onFallback?.();
    navigate({ to: fallback, replace });
  }, [canGoBack, fallback, navigate, onFallback, replace, router]);
};
