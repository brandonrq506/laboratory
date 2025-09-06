import { describe, expect, it } from "vitest";
import { isHtmlResponse } from "../isHtmlResponse";

describe("isHtmlResponse", () => {
  it("should return true when Content-Type is text/html", () => {
    const headers = {
      "Content-Type": "text/html",
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(true);
  });

  it("should return true when Content-Type is text/html with charset", () => {
    const headers = {
      "Content-Type": "text/html; charset=utf-8",
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(true);
  });

  it("should return true when Content-Type is TEXT/HTML (case insensitive)", () => {
    const headers = {
      "Content-Type": "TEXT/HTML",
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(true);
  });

  it("should return false when Content-Type is application/json", () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(false);
  });

  it("should return false when Content-Type is not defined", () => {
    const headers = {};

    const result = isHtmlResponse(headers);

    expect(result).toBe(false);
  });

  it("should return false when Content-Type is null", () => {
    const headers = {
      "Content-Type": null,
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(false);
  });

  it("should return false when Content-Type is undefined", () => {
    const headers = {
      "Content-Type": undefined,
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(false);
  });

  it("should return false when Content-Type is an empty string", () => {
    const headers = {
      "Content-Type": "",
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(false);
  });

  it("should handle numeric Content-Type values", () => {
    const headers = {
      "Content-Type": 123,
    };

    const result = isHtmlResponse(headers);

    expect(result).toBe(false);
  });
});
