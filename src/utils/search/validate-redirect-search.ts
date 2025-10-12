interface RedirectSearch {
  redirect?: string;
}

export const validateRedirectSearch = (param: unknown): RedirectSearch => {
  const redirect = param;
  if (typeof redirect === "string" && redirect.length > 0) {
    return { redirect };
  }
  return {};
};
