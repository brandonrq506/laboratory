import {
  VARIANT_SEED_DATE_FORMAT,
  VARIANT_SEED_SEPARATOR,
} from "../constants/variants";
import { format } from "date-fns";

/** Seed that holds a phrase until the day or the Completed Task count changes. */
export function getVariantSeed(now: Date, count: number): string {
  return [format(now, VARIANT_SEED_DATE_FORMAT), count].join(
    VARIANT_SEED_SEPARATOR,
  );
}
