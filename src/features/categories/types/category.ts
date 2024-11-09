import { BaseEntity } from "@/types/core";
import { Colors } from "@/features/colors/types/colors";

export type Category = BaseEntity & {
  color: Colors;
  name: string;
  user_id: number;
};
