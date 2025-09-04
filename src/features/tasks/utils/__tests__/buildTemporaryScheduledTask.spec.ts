import { buildTemporaryScheduledTask } from "../buildTemporaryScheduledTask";

describe("buildTemporaryScheduledTask", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseActivity = {
    id: 201,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
    user_id: 1,
    display_name: "Activity B",
    name: "activity-b",
    exp_seconds: 900,
    max_seconds: 3600,
    category: {
      id: 20,
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2025-01-01T00:00:00.000Z",
      name: "Cat",
      user_id: 1,
      color: "blue",
    },
  } as const;

  it("returns a scheduled task with negative temporary id and TEMP position", () => {
    const now = new Date("2025-08-24T10:00:00.000Z");
    vi.setSystemTime(now);

    const task = buildTemporaryScheduledTask(baseActivity);

    expect(task.status).toBe("scheduled");
    expect(task.id).toBeLessThan(0);
    expect(task.position).toBe("TEMP");
    expect(task.start_time).toBeNull();
    expect(task.end_time).toBeNull();
    expect(task.note).toBe("");
    expect(task.optional_name).toBeNull();
    expect(task.created_at).toBe(now.toISOString());
    expect(task.updated_at).toBe(now.toISOString());
  });
});
