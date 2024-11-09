import { CATEGORIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PatchCategory } from "../../types/patchCategory";

//TODO: Removed hardcoded userId

type Props = {
  category: PatchCategory;
  categoryId: number;
};

export const updateCategory = async ({ category, categoryId }: Props) => {
  const URL = `${USERS_ENDPOINT}/1${CATEGORIES_ENDPOINT}/${categoryId}`;

  const response = await apiV1.patch(URL, category);
  return response.data;
};
