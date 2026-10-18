/** FNV-1a 32-bit offset basis; seeds the hash that picks a phrase variant. */
export const VARIANT_HASH_OFFSET = 0x811c9dc5;

/** FNV-1a 32-bit prime; mixes each seed character into the hash. */
export const VARIANT_HASH_PRIME = 0x01000193;
