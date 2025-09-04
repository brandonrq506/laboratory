import { addEnd } from "../addEnd";

describe("addEnd", () => {
  it("adds item to end when list is defined", () => {
    const list = [1, 2, 3];
    const result = addEnd(list, 4);
    expect(result).toEqual([1, 2, 3, 4]);
    // should not mutate original
    expect(result).not.toBe(list);
  });

  it("creates a new list with the item when list is undefined", () => {
    const result = addEnd<number>(undefined, 1);
    expect(result).toEqual([1]);
  });

  it("works with objects and preserves previous items", () => {
    const a = { id: 1 };
    const b = { id: 2 };
    const c = { id: 3 };
    const result = addEnd([a, b], c);
    expect(result).toEqual([a, b, c]);
  });
});
