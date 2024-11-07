import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostActivity } from "../../types/postActivity";

//TODO: Revoved hardcored user id
const URL = `${USERS_ENDPOINT}/1${ACTIVITIES_ENDPOINT}`;

export const createActivity = async (activity: PostActivity) => {
  const { data } = await apiV1.post<PostActivity>(URL, activity);
  return data;
};
