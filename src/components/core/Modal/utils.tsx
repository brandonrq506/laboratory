import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const icons = {
  success: (
    <CheckBadgeIcon className="size-6 text-green-600" aria-hidden="true" />
  ),
  info: (
    <InformationCircleIcon
      className="size-6 text-yellow-600"
      aria-hidden="true"
    />
  ),
  danger: (
    <ExclamationTriangleIcon
      className="size-6 text-red-600"
      aria-hidden="true"
    />
  ),
};

export const backgrounds = {
  success: "bg-green-100",
  info: "bg-yellow-100",
  danger: "bg-red-100",
};

export const promptBorders = {
  success: "border-green-100 bg-green-50 text-green-700",
  info: "border-yellow-100 bg-yellow-50 text-yellow-700",
  danger: "border-red-100 bg-red-50 text-red-700",
};
