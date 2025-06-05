import { filterOptions } from "./filterOptions";

describe("filterOptions", () => {
  it("returns options that starts with the query", () => {
    const options = [
      { label: "Apple", value: 1 },
      { label: "Pineapple", value: 2 },
      { label: "Apricot", value: 3 },
    ];
    const query = "Ap";
    const result = filterOptions(query, options);
    expect(result).toEqual([
      { label: "Apple", value: 1 },
      { label: "Apricot", value: 3 },
      { label: "Pineapple", value: 2 },
    ]);
  });

  it("should handle case insensitivity in queries and labels", () => {
    const options = [
      { label: "apple", value: 1 },
      { label: "Banana", value: 2 },
      { label: "Apricot", value: 3 },
    ];
    const query = "AP";
    const result = filterOptions(query, options);
    expect(result).toEqual([
      { label: "apple", value: 1 },
      { label: "Apricot", value: 3 },
    ]);
  });

  it("should return an empty array if no options match the query", () => {
    const options = [
      { label: "Apple", value: 1 },
      { label: "Banana", value: 2 },
    ];
    const query = "Orange";
    const result = filterOptions(query, options);
    expect(result).toEqual([]);
  });
});
