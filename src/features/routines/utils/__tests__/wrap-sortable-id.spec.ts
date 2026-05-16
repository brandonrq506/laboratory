import {
  isWrapSortableId,
  parseWrapSortableId,
  wrapSortableId,
} from "../wrap-sortable-id";

describe("wrapSortableId", () => {
  it("encodes an application id as `wrap:<id>`", () => {
    expect(wrapSortableId(7)).toBe("wrap:7");
  });
});

describe("isWrapSortableId", () => {
  it("returns true for a wrap-prefixed string", () => {
    expect(isWrapSortableId("wrap:7")).toBe(true);
  });

  it("returns false for a numeric id", () => {
    expect(isWrapSortableId(7)).toBe(false);
  });

  it("returns false for an unrelated string", () => {
    expect(isWrapSortableId("foo")).toBe(false);
  });
});

describe("parseWrapSortableId", () => {
  it("returns the numeric application id from a valid wrap id", () => {
    expect(parseWrapSortableId("wrap:7")).toBe(7);
  });

  it("returns null when the suffix is not numeric", () => {
    expect(parseWrapSortableId("wrap:abc")).toBeNull();
  });

  it("returns null for a numeric id", () => {
    expect(parseWrapSortableId(7)).toBeNull();
  });
});
