import { Category } from "../../types/category";
import { getFirstCategoryAsOption } from "../getFirstCategoryAsOption";

describe("getFirstCategoryAsOption", () => {
  it("should return null if categories is undefined", () => {
    const categories = undefined;
    const result = getFirstCategoryAsOption(categories);
    expect(result).toBeNull();
  });

  it("should return null if categories is empty", () => {
    const categories: Category[] = [];
    const result = getFirstCategoryAsOption(categories);
    expect(result).toBeNull();
  });

  it("should return the first category as an Option", () => {
    const categories: Category[] = [
      {
        id: 1,
        name: "Category 1",
        color: "white",
        created_at: "",
        updated_at: "",
        user_id: 1,
      },
      {
        id: 2,
        name: "Category 2",
        color: "white",
        created_at: "",
        updated_at: "",
        user_id: 1,
      },
    ];
    const result = getFirstCategoryAsOption(categories);
    expect(result).toEqual({ value: 1, label: "Category 1", disabled: false });
  });
});
