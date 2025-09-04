import { removeById } from "../removeById";

describe("removeById", () => {
  it("removes the item with matching numeric id", () => {
    const list = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
    ];
    const result = removeById(list, 2);
    expect(result).toEqual([
      { id: 1, name: "a" },
      { id: 3, name: "c" },
    ]);
    // should not mutate original
    expect(result).not.toBe(list);
  });

  it("removes the item with matching string id", () => {
    const list = [
      { id: "x", name: "a" },
      { id: "y", name: "b" },
    ];
    const result = removeById(list, "x");
    expect(result).toEqual([{ id: "y", name: "b" }]);
  });

  it("returns empty array when list is undefined", () => {
    const result = removeById<{ id: number }>(undefined, 1);
    expect(result).toEqual([]);
  });

  it("returns same list when id not found", () => {
    const list = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ];
    const result = removeById(list, 999);
    expect(result).toEqual(list);
    expect(result).not.toBe(list);
  });
});
