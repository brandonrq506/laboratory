import { calculateTotalAvgTime } from "../calculateTotalAvgTime";

import { routines } from "@/test/store/routines";

describe("calculateTotalAvgTime", () => {
  const morningRoutine = routines[0];
  const workoutRoutine = routines[1];
  const emptyRoutine = routines[2];

  it("should return 0 for an empty routine", () => {
    const result = calculateTotalAvgTime(emptyRoutine.activities);
    expect(result).toBe(0);
  });

  it("should return 6420 for the workout routine", () => {
    const result = calculateTotalAvgTime(workoutRoutine.activities);
    expect(result).toBe(6420);
  });

  it("should return 0 for the morning routine", () => {
    const result = calculateTotalAvgTime(morningRoutine.activities);
    expect(result).toBe(1440);
  });
});
