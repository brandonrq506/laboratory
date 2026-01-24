type RoutineEndpoints = "all" | "visible" | "hidden";

export type RoutineApiOptions = {
  filter?: { endpoint?: RoutineEndpoints };
};
