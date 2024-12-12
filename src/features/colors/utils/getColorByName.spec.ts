import { getColorByName } from "./getColorByName";

describe("getColorByName", () => {
  it("should return color object by name", () => {
    const color = getColorByName("teal");
    expect(color).toEqual({
      id: 5,
      name: "teal",
      bgClass: "bg-teal-300",
      textClass: "text-teal-950",
      borderClass: "border-teal-700",
      fillClass: "fill-teal-600",
    });
  });

  it("should return white color object if name is invalid", () => {
    const color = getColorByName("thisDoesNotExist");
    expect(color).toEqual({
      id: 1,
      name: "white",
      bgClass: "bg-white",
      textClass: "text-black",
      borderClass: "border-black",
      fillClass: "fill-black",
    });
  });
});
