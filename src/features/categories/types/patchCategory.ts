import type { CategoryModel } from "./category-model";

export type PatchCategory = Partial<Pick<CategoryModel, "color" | "name">>;
