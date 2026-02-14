interface RedirectSearch {
  redirect?: string;
}

const INTERNAL_REDIRECT_REGEX = /^\/(?!\/)[^\s]*$/;

export const isSafeInternalRedirectPath = (
  redirect: unknown,
): redirect is string => {
  return typeof redirect === "string" && INTERNAL_REDIRECT_REGEX.test(redirect);
};

export const resolveRedirectPath = (redirect: unknown, fallback: string) => {
  if (isSafeInternalRedirectPath(redirect)) {
    return redirect;
  }

  return fallback;
};

export const validateRedirectSearch = (param: unknown): RedirectSearch => {
  if (!param || typeof param !== "object") return {};

  const redirect = (param as RedirectSearch).redirect;

  if (isSafeInternalRedirectPath(redirect)) {
    return { redirect };
  }

  return {};
};
