import {
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { linkOptions } from "@tanstack/react-router";

export const sidebarLinks = linkOptions([
  { label: "Activities", to: "/activities", icon: UsersIcon },
  { label: "Timer", to: "/timer", icon: ClockIcon },
  // History is missing `search = { date: today() }`
  { label: "History", to: "/history", icon: RectangleStackIcon },
  { label: "Routines", to: "/routines", icon: DocumentTextIcon },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
]);

export type SidebarLink = (typeof sidebarLinks)[number];
