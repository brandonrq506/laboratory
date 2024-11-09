import { Category } from "./category";

export type PatchCategory = Partial<Pick<Category, "color" | "name">>;
