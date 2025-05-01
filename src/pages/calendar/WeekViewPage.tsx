/* eslint-disable max-lines */
import { PageHeader } from "@/components/layout";
import { WeekView } from "./WeekView";

const events = [
  // ==================== MONDAY ====================

  {
    id: 1,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T12:35:00.000Z",
    end_time: "2025-01-06T12:40:00.000Z",
  },
  {
    id: 2,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-06T12:40:00.000Z",
    end_time: "2025-01-06T12:50:00.000Z",
  },
  {
    id: 3,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T12:50:00.000Z",
    end_time: "2025-01-06T12:55:00.000Z",
  },
  {
    id: 4,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T12:55:00.000Z",
    end_time: "2025-01-06T13:05:00.000Z",
  },
  {
    id: 5,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-06T13:05:00.000Z",
    end_time: "2025-01-06T13:10:00.000Z",
  },
  {
    id: 6,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T13:10:00.000Z",
    end_time: "2025-01-06T13:20:00.000Z",
  },
  {
    id: 7,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T13:20:00.000Z",
    end_time: "2025-01-06T13:25:00.000Z",
  },
  {
    id: 8,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-06T13:25:00.000Z",
    end_time: "2025-01-06T13:30:00.000Z",
  },
  {
    id: 9,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T13:30:00.000Z",
    end_time: "2025-01-06T13:50:00.000Z",
  },
  {
    id: 10,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T13:50:00.000Z",
    end_time: "2025-01-06T14:00:00.000Z",
  },
  {
    id: 15,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-06T14:00:00.000Z",
    end_time: "2025-01-06T18:00:00.000Z",
  },
  {
    id: 16,
    activity: {
      name: "Lunch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T18:00:00.000Z",
    end_time: "2025-01-06T18:30:00.000Z",
  },
  {
    id: 17,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T18:30:00.000Z",
    end_time: "2025-01-06T18:40:00.000Z",
  },
  {
    id: 20,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-06T18:40:00.000Z",
    end_time: "2025-01-06T19:00:00.000Z",
  },
  {
    id: 21,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-06T19:00:00.000Z",
    end_time: "2025-01-06T21:55:00.000Z",
  },
  {
    id: 22,
    activity: {
      name: "PreWorkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-06T21:55:00.000Z",
    end_time: "2025-01-06T22:00:00.000Z",
  },
  {
    id: 23,
    activity: {
      name: "Workout",
      category: { color: "blue" },
    },
    start_time: "2025-01-06T22:00:00.000Z",
    end_time: "2025-01-07T00:15:00.000Z",
  },
  {
    id: 24,
    activity: {
      name: "PostWorkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-07T00:15:00.000Z",
    end_time: "2025-01-07T00:20:00.000Z",
  },
  {
    id: 25,
    activity: {
      name: "Snack",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T00:20:00.000Z",
    end_time: "2025-01-07T00:30:00.000Z",
  },
  {
    id: 26,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T00:30:00.000Z",
    end_time: "2025-01-07T00:40:00.000Z",
  },
  {
    id: 27,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-07T00:40:00.000Z",
    end_time: "2025-01-07T00:50:00.000Z",
  },
  {
    id: 28,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T00:50:00.000Z",
    end_time: "2025-01-07T01:10:00.000Z",
  },
  {
    id: 29,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T01:10:00.000Z",
    end_time: "2025-01-07T01:20:00.000Z",
  },
  {
    id: 30,
    activity: {
      name: "Corfew",
      category: { color: "rose" },
    },
    start_time: "2025-01-07T04:00:00.000Z",
    end_time: "2025-01-07T05:59:00.000Z",
  },

  // ==================== TUESDAY ====================

  {
    id: 101,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T12:35:00.000Z",
    end_time: "2025-01-07T12:40:00.000Z",
  },
  {
    id: 102,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-07T12:40:00.000Z",
    end_time: "2025-01-07T12:50:00.000Z",
  },
  {
    id: 103,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T12:50:00.000Z",
    end_time: "2025-01-07T12:55:00.000Z",
  },
  {
    id: 104,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T12:55:00.000Z",
    end_time: "2025-01-07T13:05:00.000Z",
  },
  {
    id: 105,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-07T13:05:00.000Z",
    end_time: "2025-01-07T13:10:00.000Z",
  },
  {
    id: 106,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T13:10:00.000Z",
    end_time: "2025-01-07T13:20:00.000Z",
  },
  {
    id: 107,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T13:20:00.000Z",
    end_time: "2025-01-07T13:25:00.000Z",
  },
  {
    id: 108,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-07T13:25:00.000Z",
    end_time: "2025-01-07T13:30:00.000Z",
  },
  {
    id: 109,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T13:30:00.000Z",
    end_time: "2025-01-07T13:50:00.000Z",
  },
  {
    id: 110,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T13:50:00.000Z",
    end_time: "2025-01-07T14:00:00.000Z",
  },
  {
    id: 115,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-07T14:00:00.000Z",
    end_time: "2025-01-07T18:00:00.000Z",
  },
  {
    id: 116,
    activity: {
      name: "Lunch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T18:00:00.000Z",
    end_time: "2025-01-07T18:30:00.000Z",
  },
  {
    id: 117,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T18:30:00.000Z",
    end_time: "2025-01-07T18:40:00.000Z",
  },
  {
    id: 120,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-07T18:40:00.000Z",
    end_time: "2025-01-07T19:00:00.000Z",
  },
  {
    id: 121,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-07T19:00:00.000Z",
    end_time: "2025-01-07T23:00:00.000Z",
  },
  {
    id: 140,
    activity: {
      name: "Preworkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-08T00:30:00.000Z",
    end_time: "2025-01-08T00:40:00.000Z",
  },
  {
    id: 141,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T00:40:00.000Z",
    end_time: "2025-01-08T00:50:00.000Z",
  },
  {
    id: 142,
    activity: {
      name: "Workout",
      category: { color: "blue" },
    },
    start_time: "2025-01-08T00:50:00.000Z",
    end_time: "2025-01-08T03:00:00.000Z",
  },
  {
    id: 143,
    activity: {
      name: "PostWorkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-08T03:00:00.000Z",
    end_time: "2025-01-08T03:05:00.000Z",
  },
  {
    id: 144,
    activity: {
      name: "Snack",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T03:05:00.000Z",
    end_time: "2025-01-08T03:15:00.000Z",
  },
  {
    id: 145,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T03:15:00.000Z",
    end_time: "2025-01-08T03:25:00.000Z",
  },
  {
    id: 146,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-08T03:25:00.000Z",
    end_time: "2025-01-08T03:35:00.000Z",
  },
  {
    id: 147,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T03:35:00.000Z",
    end_time: "2025-01-08T03:55:00.000Z",
  },
  {
    id: 147,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T03:55:00.000Z",
    end_time: "2025-01-08T04:05:00.000Z",
  },
  {
    id: 148,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T04:05:00.000Z",
    end_time: "2025-01-08T04:15:00.000Z",
  },

  // ==================== WEDNESDAY ====================

  {
    id: 201,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T12:35:00.000Z",
    end_time: "2025-01-08T12:40:00.000Z",
  },
  {
    id: 202,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-08T12:40:00.000Z",
    end_time: "2025-01-08T12:50:00.000Z",
  },
  {
    id: 203,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T12:50:00.000Z",
    end_time: "2025-01-08T12:55:00.000Z",
  },
  {
    id: 204,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T12:55:00.000Z",
    end_time: "2025-01-08T13:05:00.000Z",
  },
  {
    id: 205,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-08T13:05:00.000Z",
    end_time: "2025-01-08T13:10:00.000Z",
  },
  {
    id: 206,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T13:10:00.000Z",
    end_time: "2025-01-08T13:20:00.000Z",
  },
  {
    id: 207,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T13:20:00.000Z",
    end_time: "2025-01-08T13:25:00.000Z",
  },
  {
    id: 208,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-08T13:25:00.000Z",
    end_time: "2025-01-08T13:30:00.000Z",
  },
  {
    id: 209,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T13:30:00.000Z",
    end_time: "2025-01-08T13:50:00.000Z",
  },
  {
    id: 210,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T13:50:00.000Z",
    end_time: "2025-01-08T14:00:00.000Z",
  },
  {
    id: 215,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-08T14:00:00.000Z",
    end_time: "2025-01-08T18:00:00.000Z",
  },
  {
    id: 216,
    activity: {
      name: "Lunch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T18:00:00.000Z",
    end_time: "2025-01-08T18:30:00.000Z",
  },
  {
    id: 217,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T18:30:00.000Z",
    end_time: "2025-01-08T18:40:00.000Z",
  },
  {
    id: 220,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-08T18:40:00.000Z",
    end_time: "2025-01-08T19:00:00.000Z",
  },
  {
    id: 221,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-08T19:00:00.000Z",
    end_time: "2025-01-08T23:00:00.000Z",
  },
  {
    id: 240,
    activity: {
      name: "Preworkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-09T01:10:00.000Z",
    end_time: "2025-01-09T01:20:00.000Z",
  },
  {
    id: 241,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T01:20:00.000Z",
    end_time: "2025-01-09T01:30:00.000Z",
  },
  {
    id: 242,
    activity: {
      name: "Workout",
      category: { color: "blue" },
    },
    start_time: "2025-01-09T01:30:00.000Z",
    end_time: "2025-01-09T03:30:00.000Z",
  },
  {
    id: 243,
    activity: {
      name: "PostWorkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-09T03:30:00.000Z",
    end_time: "2025-01-09T03:35:00.000Z",
  },
  {
    id: 244,
    activity: {
      name: "Snack",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T03:35:00.000Z",
    end_time: "2025-01-09T03:45:00.000Z",
  },
  {
    id: 245,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T03:45:00.000Z",
    end_time: "2025-01-09T03:55:00.000Z",
  },
  {
    id: 246,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-09T03:55:00.000Z",
    end_time: "2025-01-09T04:05:00.000Z",
  },
  {
    id: 247,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T04:05:00.000Z",
    end_time: "2025-01-09T04:25:00.000Z",
  },
  {
    id: 247,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T04:25:00.000Z",
    end_time: "2025-01-09T04:35:00.000Z",
  },

  // ==================== THURSDAY ====================

  {
    id: 301,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T12:35:00.000Z",
    end_time: "2025-01-09T12:40:00.000Z",
  },
  {
    id: 302,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-09T12:40:00.000Z",
    end_time: "2025-01-09T12:50:00.000Z",
  },
  {
    id: 303,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T12:50:00.000Z",
    end_time: "2025-01-09T12:55:00.000Z",
  },
  {
    id: 304,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T12:55:00.000Z",
    end_time: "2025-01-09T13:05:00.000Z",
  },
  {
    id: 305,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-09T13:05:00.000Z",
    end_time: "2025-01-09T13:10:00.000Z",
  },
  {
    id: 306,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T13:10:00.000Z",
    end_time: "2025-01-09T13:20:00.000Z",
  },
  {
    id: 307,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T13:20:00.000Z",
    end_time: "2025-01-09T13:25:00.000Z",
  },
  {
    id: 308,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-09T13:25:00.000Z",
    end_time: "2025-01-09T13:30:00.000Z",
  },
  {
    id: 309,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T13:30:00.000Z",
    end_time: "2025-01-09T13:50:00.000Z",
  },
  {
    id: 310,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T13:50:00.000Z",
    end_time: "2025-01-09T14:00:00.000Z",
  },
  {
    id: 315,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-09T14:00:00.000Z",
    end_time: "2025-01-09T18:00:00.000Z",
  },
  {
    id: 316,
    activity: {
      name: "Lunch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T18:00:00.000Z",
    end_time: "2025-01-09T18:30:00.000Z",
  },
  {
    id: 317,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T18:30:00.000Z",
    end_time: "2025-01-09T18:40:00.000Z",
  },
  {
    id: 320,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-09T18:40:00.000Z",
    end_time: "2025-01-09T19:00:00.000Z",
  },
  {
    id: 321,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-09T19:00:00.000Z",
    end_time: "2025-01-09T23:00:00.000Z",
  },
  {
    id: 392,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T02:00:00.000Z",
    end_time: "2025-01-10T02:10:00.000Z",
  },
  {
    id: 393,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-10T02:10:00.000Z",
    end_time: "2025-01-10T02:20:00.000Z",
  },
  {
    id: 394,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T02:20:00.000Z",
    end_time: "2025-01-10T02:40:00.000Z",
  },
  {
    id: 395,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T02:40:00.000Z",
    end_time: "2025-01-10T02:50:00.000Z",
  },

  // ==================== FRIDAY ====================

  {
    id: 401,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T12:35:00.000Z",
    end_time: "2025-01-10T12:40:00.000Z",
  },
  {
    id: 402,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-10T12:40:00.000Z",
    end_time: "2025-01-10T12:50:00.000Z",
  },
  {
    id: 403,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T12:50:00.000Z",
    end_time: "2025-01-10T12:55:00.000Z",
  },
  {
    id: 404,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T12:55:00.000Z",
    end_time: "2025-01-10T13:05:00.000Z",
  },
  {
    id: 405,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-10T13:05:00.000Z",
    end_time: "2025-01-10T13:10:00.000Z",
  },
  {
    id: 406,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T13:10:00.000Z",
    end_time: "2025-01-10T13:20:00.000Z",
  },
  {
    id: 407,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T13:20:00.000Z",
    end_time: "2025-01-10T13:25:00.000Z",
  },
  {
    id: 408,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-10T13:25:00.000Z",
    end_time: "2025-01-10T13:30:00.000Z",
  },
  {
    id: 409,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T13:30:00.000Z",
    end_time: "2025-01-10T13:50:00.000Z",
  },
  {
    id: 410,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T13:50:00.000Z",
    end_time: "2025-01-10T14:00:00.000Z",
  },
  {
    id: 415,
    activity: {
      name: "Work",
      category: { color: "blue" },
    },
    start_time: "2025-01-10T14:00:00.000Z",
    end_time: "2025-01-10T18:00:00.000Z",
  },
  {
    id: 416,
    activity: {
      name: "Chores (Clean Desk)",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T18:00:00.000Z",
    end_time: "2025-01-10T18:20:00.000Z",
  },
  {
    id: 416,
    activity: {
      name: "Chores (Clean Laptop)",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T18:20:00.000Z",
    end_time: "2025-01-10T18:30:00.000Z",
  },
  {
    id: 416,
    activity: {
      name: "Chores (Clip Nails)",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T18:30:00.000Z",
    end_time: "2025-01-10T18:40:00.000Z",
  },
  {
    id: 420,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-10T19:00:00.000Z",
    end_time: "2025-01-10T19:10:00.000Z",
  },
  {
    id: 421,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T19:10:00.000Z",
    end_time: "2025-01-10T19:30:00.000Z",
  },
  {
    id: 422,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T19:30:00.000Z",
    end_time: "2025-01-10T19:40:00.000Z",
  },
  {
    id: 428,
    activity: {
      name: "Lunch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T19:40:00.000Z",
    end_time: "2025-01-10T20:10:00.000Z",
  },
  {
    id: 429,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T20:10:00.000Z",
    end_time: "2025-01-10T20:20:00.000Z",
  },
  {
    id: 440,
    activity: {
      name: "Preworkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-10T22:40:00.000Z",
    end_time: "2025-01-10T22:50:00.000Z",
  },
  {
    id: 441,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-10T22:50:00.000Z",
    end_time: "2025-01-10T23:00:00.000Z",
  },
  {
    id: 442,
    activity: {
      name: "Workout",
      category: { color: "blue" },
    },
    start_time: "2025-01-10T23:00:00.000Z",
    end_time: "2025-01-11T01:30:00.000Z",
  },
  {
    id: 443,
    activity: {
      name: "PostWorkout",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T01:30:00.000Z",
    end_time: "2025-01-11T01:35:00.000Z",
  },
  {
    id: 444,
    activity: {
      name: "Snack",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T01:35:00.000Z",
    end_time: "2025-01-11T01:45:00.000Z",
  },
  {
    id: 445,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T01:45:00.000Z",
    end_time: "2025-01-11T01:55:00.000Z",
  },
  {
    id: 446,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T01:55:00.000Z",
    end_time: "2025-01-11T02:05:00.000Z",
  },
  {
    id: 447,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T02:05:00.000Z",
    end_time: "2025-01-11T02:25:00.000Z",
  },
  {
    id: 448,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T02:25:00.000Z",
    end_time: "2025-01-11T02:35:00.000Z",
  },
  {
    id: 449,
    activity: {
      name: "Joha",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T02:35:00.000Z",
    end_time: "2025-01-11T04:00:00.000Z",
  },
  {
    id: 450,
    activity: {
      name: "Corfew",
      category: { color: "rose" },
    },
    start_time: "2025-01-11T04:00:00.000Z",
    end_time: "2025-01-11T05:59:00.000Z",
  },

  // ==================== SATURDAY ====================

  {
    id: 501,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T13:30:00.000Z",
    end_time: "2025-01-11T13:35:00.000Z",
  },
  {
    id: 502,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T13:35:00.000Z",
    end_time: "2025-01-11T13:45:00.000Z",
  },
  {
    id: 503,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T13:45:00.000Z",
    end_time: "2025-01-11T13:50:00.000Z",
  },
  {
    id: 504,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T13:50:00.000Z",
    end_time: "2025-01-11T14:00:00.000Z",
  },
  {
    id: 505,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T14:00:00.000Z",
    end_time: "2025-01-11T14:05:00.000Z",
  },
  {
    id: 506,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T14:05:00.000Z",
    end_time: "2025-01-11T14:15:00.000Z",
  },
  {
    id: 507,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T14:15:00.000Z",
    end_time: "2025-01-11T14:20:00.000Z",
  },
  {
    id: 508,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T14:20:00.000Z",
    end_time: "2025-01-11T14:25:00.000Z",
  },
  {
    id: 509,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T14:25:00.000Z",
    end_time: "2025-01-11T14:45:00.000Z",
  },
  {
    id: 510,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T14:45:00.000Z",
    end_time: "2025-01-11T14:55:00.000Z",
  },
  {
    id: 510,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T14:45:00.000Z",
    end_time: "2025-01-11T14:55:00.000Z",
  },
  {
    id: 565,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-11T21:00:00.000Z",
    end_time: "2025-01-11T21:10:00.000Z",
  },
  {
    id: 566,
    activity: {
      name: "Shower",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T21:10:00.000Z",
    end_time: "2025-01-11T21:30:00.000Z",
  },
  {
    id: 566,
    activity: {
      name: "Chores",
      category: { color: "emerald" },
    },
    start_time: "2025-01-11T21:30:00.000Z",
    end_time: "2025-01-11T21:40:00.000Z",
  },
  {
    id: 591,
    activity: {
      name: "Bae",
      category: { color: "amber" },
    },
    start_time: "2025-01-12T01:00:00.000Z",
    end_time: "2025-01-12T04:00:00.000Z",
  },

  // ==================== SUNDAY ====================

  {
    id: 601,
    activity: {
      name: "Make Bed",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T13:30:00.000Z",
    end_time: "2025-01-12T13:35:00.000Z",
  },
  {
    id: 602,
    activity: {
      name: "Bathroom",
      category: { color: "amber" },
    },
    start_time: "2025-01-12T13:35:00.000Z",
    end_time: "2025-01-12T13:45:00.000Z",
  },
  {
    id: 603,
    activity: {
      name: "Weight",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T13:45:00.000Z",
    end_time: "2025-01-12T13:50:00.000Z",
  },
  {
    id: 604,
    activity: {
      name: "Stretch",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T13:50:00.000Z",
    end_time: "2025-01-12T14:00:00.000Z",
  },
  {
    id: 605,
    activity: {
      name: "Reply",
      category: { color: "amber" },
    },
    start_time: "2025-01-12T14:00:00.000Z",
    end_time: "2025-01-12T14:05:00.000Z",
  },
  {
    id: 606,
    activity: {
      name: "Dishes",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T14:05:00.000Z",
    end_time: "2025-01-12T14:15:00.000Z",
  },
  {
    id: 607,
    activity: {
      name: "Water Refill",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T14:15:00.000Z",
    end_time: "2025-01-12T14:20:00.000Z",
  },
  {
    id: 608,
    activity: {
      name: "Barbara",
      category: { color: "amber" },
    },
    start_time: "2025-01-12T14:20:00.000Z",
    end_time: "2025-01-12T14:25:00.000Z",
  },
  {
    id: 609,
    activity: {
      name: "Breakfast",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T14:25:00.000Z",
    end_time: "2025-01-12T14:45:00.000Z",
  },
  {
    id: 610,
    activity: {
      name: "Brush Teeth",
      category: { color: "emerald" },
    },
    start_time: "2025-01-12T14:45:00.000Z",
    end_time: "2025-01-12T14:55:00.000Z",
  },
];

export const WeekViewPage = () => {
  return (
    <div>
      <PageHeader title="Week View" />
      <WeekView events={events} />
    </div>
  );
};
