import { calculateTotalExpTime } from "../calculateTotalExpTime";

import { routines } from "@/test/store/routines";

describe("calculateTotalExpTime", () => {
  const morningRoutine = routines[0];
  const workoutRoutine = routines[1];
  const emptyRoutine = routines[2];

  it("should return 0 for an empty routine", () => {
    const result = calculateTotalExpTime(emptyRoutine.activities);
    expect(result).toBe(0);
  });

  it("should return 6420 for the workout routine", () => {
    const result = calculateTotalExpTime(workoutRoutine.activities);
    expect(result).toBe(6420);
  });

  it("should return 0 for the morning routine", () => {
    const result = calculateTotalExpTime(morningRoutine.activities);
    expect(result).toBe(1440);
  });
});
