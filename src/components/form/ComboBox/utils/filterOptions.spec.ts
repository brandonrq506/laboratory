import { Option } from "@/types/core";
import { filterOptions } from "./filterOptions";

describe("filterOptions", () => {
  const testOptions: Option[] = [
    { value: 1, label: "Apple" },
    { value: 2, label: "Banana" },
    { value: 3, label: "Orange" },
    { value: 4, label: "Pineapple" },
    { value: 5, label: "Apple juice" },
  ];

  it("returns all options when query is empty", () => {
    const query = "";
    const result = filterOptions(query, testOptions);
    expect(result).toEqual(testOptions);
  });

  it("returns all options when query is just whitespace", () => {
    const query = "   ";
    const result = filterOptions(query, testOptions);
    expect(result).toEqual(testOptions);
  });

  it("performs case-insensitive matching", () => {
    const query = "APPLE";
    const result = filterOptions(query, testOptions);
    expect(result).toHaveLength(3);
    expect(result.some((op) => op.label === "Apple")).toBe(true);
    expect(result.some((op) => op.label === "Apple juice")).toBe(true);
    expect(result.some((op) => op.label === "Pineapple")).toBe(true);
  });

  it("returns an empty array when no matches are found", () => {
    const query = "xyz";
    const result = filterOptions(query, testOptions);
    expect(result).toEqual([]);
  });

  it("places exact matches before partial matches", () => {
    const query = "apple";
    const result = filterOptions(query, testOptions);
    expect(result).toHaveLength(3);
    expect(result[0].label).toBe("Apple");
    expect(result[2].label).toBe("Apple juice");
    expect(result[1].label).toBe("Pineapple");
  });

  it("works with an empty options array", () => {
    const query = "apple";
    const result = filterOptions(query, []);
    expect(result).toEqual([]);
  });
});
