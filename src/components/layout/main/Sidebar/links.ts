import {
  CalendarIcon,
  ClockIcon,
  Cog6ToothIcon,
  QueueListIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getToday } from "@/utils";
import { linkOptions } from "@tanstack/react-router";

export const sidebarLinks = linkOptions([
  { label: "Timer", to: "/timer", icon: ClockIcon },
  {
    label: "History",
    to: "/history",
    icon: CalendarIcon,
    search: () => ({ date: getToday() }),
  },
  { label: "Activities", to: "/activities", icon: UsersIcon },
  { label: "Routines", to: "/routines", icon: QueueListIcon },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
]);

export type SidebarLink = (typeof sidebarLinks)[number];
