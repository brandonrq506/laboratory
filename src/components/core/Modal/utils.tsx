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
