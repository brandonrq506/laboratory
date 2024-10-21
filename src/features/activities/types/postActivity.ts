import { CreateForm } from "./createForm";

export type PostActivity = Omit<CreateForm, "category_id"> & {
  category_id: number;
};
