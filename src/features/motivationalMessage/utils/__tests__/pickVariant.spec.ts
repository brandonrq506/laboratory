import { addDays } from "date-fns";
import { getVariantSeed } from "../getVariantSeed";
import { pickVariant } from "../pickVariant";

const FIRST_DAY = new Date("2026-10-01T00:00:00");
const DAYS_SAMPLED = 30;
const COUNT = 5;

const SEED = getVariantSeed(FIRST_DAY, COUNT);
const SEEDS = Array.from({ length: DAYS_SAMPLED }, (_, day) =>
  getVariantSeed(addDays(FIRST_DAY, day), COUNT),
);

describe("pickVariant", () => {
  it("returns the only variant when there is one", () => {
    expect(pickVariant(["only"], SEED)).toBe("only");
  });

  it("picks the same variant for the same seed", () => {
    const variants = ["first", "second"] as const;

    expect(pickVariant(variants, SEED)).toBe(pickVariant(variants, SEED));
  });

  it.each([
    { variants: ["first", "second"] as const },
    { variants: ["first", "second", "third"] as const },
  ])(
    "spreads picks across all $variants.length variants over a month",
    ({ variants }) => {
      const picked = new Set(SEEDS.map((seed) => pickVariant(variants, seed)));

      expect(picked).toEqual(new Set(variants));
    },
  );
});
