import {
  isSafeInternalRedirectPath,
  resolveRedirectPath,
  validateRedirectSearch,
} from "../validate-redirect-search";

describe("validateRedirectSearch", () => {
  it("keeps safe internal redirect paths", () => {
    expect(
      validateRedirectSearch({ redirect: "/timer?date=today#panel" }),
    ).toEqual({ redirect: "/timer?date=today#panel" });
  });

  it("drops unsafe redirect values", () => {
    expect(validateRedirectSearch({ redirect: "https://evil.com" })).toEqual(
      {},
    );
    expect(validateRedirectSearch({ redirect: "//evil.com" })).toEqual({});
    expect(validateRedirectSearch({ redirect: "timer" })).toEqual({});
    expect(validateRedirectSearch({ redirect: "/timer with spaces" })).toEqual(
      {},
    );
  });
});

describe("redirect path helpers", () => {
  it("validates internal redirect paths", () => {
    expect(isSafeInternalRedirectPath("/history")).toBe(true);
    expect(isSafeInternalRedirectPath("/history?date=today")).toBe(true);
    expect(isSafeInternalRedirectPath("history")).toBe(false);
    expect(isSafeInternalRedirectPath("//history")).toBe(false);
  });

  it("falls back for unsafe redirects", () => {
    expect(resolveRedirectPath("/tasks", "/timer")).toBe("/tasks");
    expect(resolveRedirectPath("https://bad.site", "/timer")).toBe("/timer");
  });
});
