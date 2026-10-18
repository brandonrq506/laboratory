/** Interchangeable options for one trigger; never empty. */
export type Variants<T = string> = readonly [T, ...T[]];
