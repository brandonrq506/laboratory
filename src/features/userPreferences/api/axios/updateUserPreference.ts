import { USER_PREFERENCES_ENDPOINT, apiV1 } from "@/libs/axios";
import { UserPreferenceModel } from "../../types/userPreferenceModel";

interface Props {
  key: string;
  value: string;
}

export const updateUserPreference = async ({ key, value }: Props) => {
  const URL = `${USER_PREFERENCES_ENDPOINT}/${key}`;

  const response = await apiV1.patch<UserPreferenceModel>(URL, { value });
  return response.data;
};
