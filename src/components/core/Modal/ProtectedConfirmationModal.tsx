import { useState } from "react";

import { Description, DialogTitle, Field, Label } from "@headlessui/react";
import { Modal } from "./Modal";
import { StateInputText } from "@/components/form/TextInput/StateInputText";

import { CANCEL, CONFIRM } from "@/constants/actions";
import { backgrounds, icons, promptBorders } from "./utils";
import { Button } from "../Button/Button";
import clsx from "clsx";

type ProtectedConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmValue: string;
  isLoading?: boolean;
  icon?: keyof typeof icons;
  title?: string;
  description?: string;
};

export const ProtectedConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmValue,
  isLoading,
  icon = "danger",
  title,
  description,
}: ProtectedConfirmationModalProps) => {
  const [confirmText, setConfirmText] = useState("");

  const isConfirmDisabled = confirmText !== confirmValue || isLoading;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <span
            className={clsx(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              backgrounds[icon],
            )}>
            {icons[icon]}
          </span>
          <div className="space-y-2 text-left">
            <DialogTitle
              as="h2"
              className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <Description className="text-sm text-gray-600">
              {description}
            </Description>
          </div>
        </div>

        <div
          className={clsx(
            "rounded-md border px-4 py-3 text-sm",
            promptBorders[icon],
          )}>
          Type <span className="font-semibold">"{confirmValue}"</span> to
          confirm.
        </div>

        <Field>
          <Label className="block text-sm leading-6 font-medium text-gray-900">
            Confirmation
          </Label>
          <StateInputText
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </Field>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {CANCEL}
          </Button>
          <Button
            variant="danger"
            isLoading={isLoading}
            onClick={onConfirm}
            disabled={isConfirmDisabled}>
            {CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
