import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const icons = {
  success: (
    <CheckBadgeIcon className="text-success-text size-6" aria-hidden="true" />
  ),
  info: (
    <InformationCircleIcon
      className="text-warning-text size-6"
      aria-hidden="true"
    />
  ),
  danger: (
    <ExclamationTriangleIcon
      className="text-danger-text size-6"
      aria-hidden="true"
    />
  ),
};

export const backgrounds = {
  success: "bg-success-subtle",
  info: "bg-warning-subtle",
  danger: "bg-danger-tint",
};
