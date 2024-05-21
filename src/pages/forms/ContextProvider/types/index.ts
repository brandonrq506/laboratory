import { Option } from "@/types/core";

export type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  favFood: Option | null;
  favColor: Option | null;
  groupSize: number;
};
