import { BaseEntity } from "@/types/core";

export type ActivityAPI = BaseEntity & {
  avg_time: number | null;
  category: {
    id: number;
    name: string;
  };
  max_time: number | null;
  name: string | null;
  user_id: number;
};
