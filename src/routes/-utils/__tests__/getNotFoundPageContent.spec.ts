import { getNotFoundPageContent } from "../getNotFoundPageContent";

describe("getNotFoundPageContent", () => {
  it("returns generic copy for an unknown URL", () => {
    expect(getNotFoundPageContent(undefined)).toEqual({
      title: "Page not found",
      description: "Sorry, we couldn't find the page you're looking for.",
    });
  });

  it("returns entity-specific copy for a missing resource", () => {
    expect(getNotFoundPageContent({ entity: "Activity" })).toEqual({
      title: "Activity not found",
      description:
        "The activity you're looking for doesn't exist or may have been deleted.",
    });
  });

  it("ignores malformed not-found data", () => {
    expect(getNotFoundPageContent({ entity: 1 }).title).toBe("Page not found");
    expect(getNotFoundPageContent({ entity: "Unknown" }).title).toBe(
      "Page not found",
    );
  });
});
