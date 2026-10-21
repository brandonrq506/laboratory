import { instantOnTransform, wallClockTransform } from "./timeInputTransforms";

describe("wallClockTransform", () => {
  it("passes HH:mm through on input", () => {
    expect(wallClockTransform.input("07:30")).toBe("07:30");
  });

  it("renders null as an empty input", () => {
    expect(wallClockTransform.input(null)).toBe("");
  });

  it("passes HH:mm through on output", () => {
    expect(wallClockTransform.output("07:30")).toBe("07:30");
  });

  it("keeps a cleared input as empty string", () => {
    expect(wallClockTransform.output("")).toBe("");
  });
});

describe("instantOnTransform", () => {
  const date = new Date(2026, 9, 19, 9, 0, 45, 500);
  const transform = instantOnTransform(date);

  it("renders an ISO string as local HH:mm", () => {
    const iso = new Date(2026, 9, 19, 14, 5).toISOString();

    expect(transform.input(iso)).toBe("14:05");
  });

  it("renders an empty value as an empty input", () => {
    expect(transform.input("")).toBe("");
    expect(transform.input(null)).toBe("");
  });

  it("renders an invalid value as an empty input instead of throwing", () => {
    expect(transform.input("not-a-date")).toBe("");
  });

  it("puts HH:mm on the given date, keeping its seconds", () => {
    const expected = new Date(2026, 9, 19, 9, 15, 45, 500).toISOString();

    expect(transform.output("09:15")).toBe(expected);
  });

  it("accepts the date as an ISO string", () => {
    const fromIso = instantOnTransform(date.toISOString());
    const expected = new Date(2026, 9, 19, 23, 59, 45, 500).toISOString();

    expect(fromIso.output("23:59")).toBe(expected);
  });

  it("keeps a cleared input as empty string instead of throwing", () => {
    expect(transform.output("")).toBe("");
  });

  it("round-trips input -> output", () => {
    const iso = new Date(2026, 9, 19, 6, 40, 45, 500).toISOString();

    expect(transform.output(transform.input(iso))).toBe(iso);
  });
});
