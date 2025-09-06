import { splitHHMM } from "../splitHHMM";

describe("splitHHMM", () => {
  it("splits '14:40' into [14, 40]", () => {
    expect(splitHHMM("14:40")).toEqual([14, 40]);
  });

  it("splits '00:00' into [0, 0]", () => {
    expect(splitHHMM("00:00")).toEqual([0, 0]);
  });

  it("splits '7:5' into [7, 5]", () => {
    expect(splitHHMM("7:5")).toEqual([7, 5]);
  });

  it("returns [12, 34] for leading zeroes '012:034'", () => {
    expect(splitHHMM("012:034")).toEqual([12, 34]);
  });

  it("logs error when format is invalid but still returns parts", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    // invalid string won't split on ':' giving length !== 2
    const result = splitHHMM("12-34-56");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toContain("Invalid format");
    expect(result).toEqual([NaN, undefined]);
    spy.mockRestore();
  });
});
