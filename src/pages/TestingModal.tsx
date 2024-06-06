import { useDisclosure } from "@/hooks/useDisclosure";
import { useRef } from "react";

import { Button, ConfirmationModal } from "@/components/core";

export const TestingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelButtonRef = useRef(null);

  return (
    <div>
      <Button onClick={onOpen}>Testing Modal</Button>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        icon="success"
        initialFocus={cancelButtonRef}
        title="Testing Modal"
        description="This text is way to long simply to test the looks of it on the modal. I am mainly worried about the text wrapping and how it looks."
        actions={
          <>
            <Button
              onClick={onClose}
              variant="primary"
              className="inline-flex w-full justify-center sm:ml-3 sm:w-auto">
              Confirm
            </Button>
            <Button
              ref={cancelButtonRef}
              onClick={onClose}
              variant="secondary"
              className="mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto">
              Cancel
            </Button>
          </>
        }
      />
    </div>
  );
};
