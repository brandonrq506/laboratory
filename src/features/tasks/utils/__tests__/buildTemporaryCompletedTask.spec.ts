import { buildTemporaryCompletedTask } from "../buildTemporaryCompletedTask";

describe("buildTemporaryCompletedTask", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseActivity = {
    id: 101,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
    user_id: 1,
    display_name: "Activity A",
    name: "activity-a",
    exp_seconds: 600,
    max_seconds: 1800,
    category: {
      id: 10,
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2025-01-01T00:00:00.000Z",
      name: "Cat",
      user_id: 1,
      color: "blue",
    },
  } as const;

  it("returns a completed task with negative temporary id and timestamps set to now", () => {
    const now = new Date("2025-08-23T20:33:33.000Z");
    vi.setSystemTime(now);

    const start = "2025-08-23T20:00:00.000Z";
    const end = "2025-08-23T20:30:00.000Z";
    const task = buildTemporaryCompletedTask(baseActivity, start, end, "note");

    expect(task.status).toBe("completed");
    expect(task.id).toBeLessThan(0);
    expect(task.position).toBeNull();
    expect(task.start_time).toBe(start);
    expect(task.end_time).toBe(end);
    expect(task.note).toBe("note");
    expect(task.optional_name).toBeNull();
    expect(task.created_at).toBe(now.toISOString());
    expect(task.updated_at).toBe(now.toISOString());
  });

  it("defaults note to empty string when not provided", () => {
    const now = new Date("2025-08-23T22:00:00.000Z");
    vi.setSystemTime(now);

    const start = "2025-08-23T21:00:00.000Z";
    const end = "2025-08-23T21:30:00.000Z";
    const task = buildTemporaryCompletedTask(baseActivity, start, end);

    expect(task.note).toBe("");
    expect(task.created_at).toBe(now.toISOString());
  });
});
