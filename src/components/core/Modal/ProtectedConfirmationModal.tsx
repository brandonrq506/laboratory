import { useCallback, useState } from "react";

import { Description, DialogTitle, Field, Label } from "@headlessui/react";
import { Modal } from "./Modal";
import { StateInputText } from "@/components/form";

import { CANCEL, CONFIRM } from "@/constants/actions";
import { Button } from "../Button/Button";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type ProtectedConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmValue: string;
  isPending?: boolean;
  title: string;
  description: string;
};

export const ProtectedConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmValue,
  isPending = false,
  title,
  description,
}: ProtectedConfirmationModalProps) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmDisabled = confirmText !== confirmValue || isPending;

  const handleClose = useCallback(() => {
    setConfirmText("");
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-6 text-red-600"
            />
          </span>
          <div className="space-y-2 text-left">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <Description className="text-sm text-gray-600">
              {description}
            </Description>
          </div>
        </div>

        <div className="rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
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
          <Button variant="secondary" onClick={handleClose}>
            {CANCEL}
          </Button>
          <Button
            variant="danger"
            isLoading={isPending}
            onClick={onConfirm}
            disabled={isConfirmDisabled}>
            {CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
