import { isNotFound } from "@tanstack/react-router";

import { validateIdParam } from "../validate-id-param";

describe("validateIdParam", () => {
  const { parse, stringify } = validateIdParam("taskId");

  it("parses a positive integer string to a number", () => {
    expect(parse({ taskId: "42" })).toEqual({ taskId: 42 });
  });

  it.each(["abc", "0", "-1", "1.5", ""])("throws notFound for %j", (raw) => {
    let thrown: unknown;
    try {
      parse({ taskId: raw });
    } catch (error) {
      thrown = error;
    }

    expect(isNotFound(thrown)).toBe(true);
  });

  it("stringifies back to the original param", () => {
    expect(stringify(parse({ taskId: "42" }))).toEqual({ taskId: "42" });
  });
});
