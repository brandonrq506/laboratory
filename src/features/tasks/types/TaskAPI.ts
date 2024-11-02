import { BaseEntity } from "@/types/core";

export type TaskAPI = BaseEntity & {
  activity_id: number;
  end_time: string | null;
  start_time: string | null;
  optional_name: string | null;
  status: string;
  user_id: number;
};
