import { addStart } from "../addStart";

describe("addStart", () => {
  it("adds item to start when list is defined", () => {
    const list = [2, 3, 4];
    const result = addStart(list, 1);
    expect(result).toEqual([1, 2, 3, 4]);
    // should not mutate original
    expect(result).not.toBe(list);
  });

  it("creates a new list with the item when list is undefined", () => {
    const result = addStart<number>(undefined, 1);
    expect(result).toEqual([1]);
  });

  it("works with objects and preserves subsequent items order", () => {
    const a = { id: 1 };
    const b = { id: 2 };
    const c = { id: 3 };
    const result = addStart([b, c], a);
    expect(result).toEqual([a, b, c]);
  });
});
