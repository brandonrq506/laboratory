import { useCallback, useState } from "react";

import { Description, DialogTitle, Field, Label } from "@headlessui/react";
import { Modal } from "./Modal";
import { StateInputText } from "@/components/form";

import { CANCEL, CONFIRM } from "@/constants/actions";
import { Button } from "../Button/Button";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type ProtectiveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmValue: string;
  isPending?: boolean;
  title: string;
  description: string;
};

export const ProtectiveModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmValue,
  isPending = false,
  title,
  description,
}: ProtectiveModalProps) => {
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
          <span className="bg-danger-subtle flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="text-danger-text size-6"
            />
          </span>
          <div className="space-y-2 text-left">
            <DialogTitle className="text-foreground text-lg font-semibold">
              {title}
            </DialogTitle>
            <Description className="text-foreground-muted text-sm">
              {description}
            </Description>
          </div>
        </div>

        <div className="border-danger-border bg-danger-subtle text-danger-strong rounded-md border px-4 py-3 text-sm">
          Type <span className="font-semibold">"{confirmValue}"</span> to
          confirm.
        </div>

        <Field>
          <Label className="text-foreground block text-sm leading-6 font-medium">
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
