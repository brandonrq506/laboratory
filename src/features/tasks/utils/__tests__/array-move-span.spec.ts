import { arrayMoveSpan } from "../array-move-span";

type Item = { id: number };

const items = (...ids: number[]): Item[] => ids.map((id) => ({ id }));
const ids = (xs: Item[]) => xs.map((x) => x.id);

describe("arrayMoveSpan", () => {
  describe("single-id span (parity with single-task arrayMove)", () => {
    const list = items(1, 2, 3, 4, 5);

    it("moves a single item to the top", () => {
      expect(ids(arrayMoveSpan(list, new Set([3]), 0))).toEqual([
        3, 1, 2, 4, 5,
      ]);
    });

    it("moves a single item to the middle", () => {
      expect(ids(arrayMoveSpan(list, new Set([1]), 2))).toEqual([
        2, 3, 1, 4, 5,
      ]);
    });

    it("moves a single item to the bottom", () => {
      expect(ids(arrayMoveSpan(list, new Set([2]), 4))).toEqual([
        1, 3, 4, 5, 2,
      ]);
    });
  });

  describe("multi-id span", () => {
    const list = items(1, 2, 3, 4, 5, 6);

    it("moves a multi-id span to the top of rest", () => {
      expect(ids(arrayMoveSpan(list, new Set([3, 4]), 0))).toEqual([
        3, 4, 1, 2, 5, 6,
      ]);
    });

    it("moves a multi-id span to the middle of rest", () => {
      expect(ids(arrayMoveSpan(list, new Set([3, 4]), 2))).toEqual([
        1, 2, 3, 4, 5, 6,
      ]);
    });

    it("moves a multi-id span to the bottom of rest", () => {
      expect(ids(arrayMoveSpan(list, new Set([3, 4]), 4))).toEqual([
        1, 2, 5, 6, 3, 4,
      ]);
    });
  });

  it("preserves the raw order of span ids in the output", () => {
    const list = items(10, 20, 30, 40, 50);
    expect(ids(arrayMoveSpan(list, new Set([40, 10, 30]), 0))).toEqual([
      10, 30, 40, 20, 50,
    ]);
  });

  it("returns an array equal to input for a no-op move", () => {
    const list = items(1, 2, 3, 4, 5);
    expect(ids(arrayMoveSpan(list, new Set([3, 4]), 2))).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });
});
