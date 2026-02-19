type DateInTheLastValue = {
  amount: number;
  unit: "days" | "months";
};

// ISO 8601
type DateBetweenValue = {
  from: string;
  to: string;
};

// Date filter operators (string = ISO 8601 date)
export type DateFilterOperators = {
  is_null?: boolean;
  is_in_the_last?: DateInTheLastValue;
  is_equal_to?: string;
  is_between?: DateBetweenValue;
  is_after?: string;
  is_before?: string;
  is_on_or_after?: string;
  is_on_or_before?: string;
};

// String filter operators
export type StringFilterOperators = {
  eq?: string;
  contains?: string;
  starts_with?: string;
  ends_with?: string;
};

// Exact filter operators (for enums, IDs, etc.)
export type ExactFilterOperators<T = string> = {
  eq?: T;
  not_eq?: T;
};
