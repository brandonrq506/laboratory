import { formatUsername } from "./formatUsername";

describe("formatUsername", () => {
  it("should return 'Unknown User' if both firstName and lastName are empty", () => {
    const result = formatUsername("", null);
    expect(result).toBe("Unknown User");
  });

  it("should return firstName if lastName is null", () => {
    const result = formatUsername("John", null);
    expect(result).toBe("John");
  });

  it("should return 'John Doe' if firstName is 'John' and lastName is 'Doe'", () => {
    const result = formatUsername("John", "Doe");
    expect(result).toBe("John Doe");
  });
});
