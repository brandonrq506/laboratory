import {
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getToday } from "@/utils";
import { linkOptions } from "@tanstack/react-router";

export const sidebarLinks = linkOptions([
  { label: "Activities", to: "/activities", icon: UsersIcon },
  { label: "Timer", to: "/timer", icon: ClockIcon },
  {
    label: "History",
    to: "/history",
    icon: RectangleStackIcon,
    search: { date: getToday() },
  },
  { label: "Routines", to: "/routines", icon: DocumentTextIcon },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
]);

export type SidebarLink = (typeof sidebarLinks)[number];
