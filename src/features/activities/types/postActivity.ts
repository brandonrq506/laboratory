import { GetActivity } from "./getActivity";

export type PostActivity = Pick<
  GetActivity,
  "avg_time" | "category_id" | "max_time" | "name"
>;
