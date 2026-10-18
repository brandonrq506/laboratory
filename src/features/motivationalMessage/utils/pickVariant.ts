import { VARIANT_HASH_OFFSET, VARIANT_HASH_PRIME } from "../constants/variants";
import type { Variants } from "../types/variants";

/** FNV-1a: spreads similar seeds (consecutive dates, counts) across variants. */
const hashSeed = (seed: string) =>
  [...seed].reduce(
    (hash, char) =>
      Math.imul(hash ^ char.charCodeAt(0), VARIANT_HASH_PRIME) >>> 0,
    VARIANT_HASH_OFFSET,
  );

/**
 * Picks one variant, the same one every time for the same seed.
 *
 * @param variants - Interchangeable options; never empty.
 * @param seed - Stable key, so the pick holds across re-renders.
 * @returns One of `variants`.
 */
export function pickVariant<T>(variants: Variants<T>, seed: string): T {
  return variants[hashSeed(seed) % variants.length];
}
