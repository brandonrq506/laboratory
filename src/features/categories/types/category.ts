import { BaseEntity } from "@/types/core";

export type Category = BaseEntity & {
  name: string;
  user_id: number;
};
