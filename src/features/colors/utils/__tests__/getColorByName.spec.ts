import { getColorByName } from "../getColorByName";

import { COLOR_NAME } from "@/features/colors/types/colors";

describe("getColorByName", () => {
  it("should return color object by name", () => {
    const color = getColorByName(COLOR_NAME.TEAL);
    expect(color).toEqual({
      id: 5,
      name: COLOR_NAME.TEAL,
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
      name: COLOR_NAME.WHITE,
      bgClass: "bg-white",
      textClass: "text-black",
      borderClass: "border-black",
      fillClass: "fill-black",
    });
  });
});
