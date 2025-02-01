import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Description, DialogTitle } from "@headlessui/react";
import { Modal, ModalProps } from "..";
import clsx from "clsx";

const icons = {
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

const backgrounds = {
  success: "bg-green-100",
  info: "bg-yellow-100",
  danger: "bg-red-100",
};

type ConfirmationModalProps = Omit<ModalProps, "children"> & {
  icon: keyof typeof icons;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
};

export const ConfirmationModal = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  actions,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className={clsx(
            "mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
            backgrounds[icon],
          )}>
          {icons[icon]}
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base leading-6 font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <div className="mt-2">
            <Description className="text-sm text-gray-500">
              {description}
            </Description>
          </div>
        </div>
      </div>
      <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        {actions}
      </div>
    </Modal>
  );
};
