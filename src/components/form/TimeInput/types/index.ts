/**
 * Translates between the form value and the "HH:mm" string a native time input works with.
 * Same idea as RHF's "Transform and Parse" pattern.
 */
export interface TimeInputTransform {
  /** Form value -> "HH:mm" shown by the input ("" when empty). */
  input: (value: string | null) => string;
  /** "HH:mm" from the input ("" when cleared) -> form value. */
  output: (hhmm: string) => string;
}
