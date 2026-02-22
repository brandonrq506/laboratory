import { useEffect, useState } from "react";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { MODAL_DURATION } from "@/constants/durations";
import clsx from "clsx";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const FullHeightModal = ({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  /**
   * Synchronize with HeadlessUI's Dialog animation system by delaying the open state.
   * This ensures the enter animation is visible when used with client-side routing
   * where components may mount before being visible to the user.
   */
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setInternalOpen(true), MODAL_DURATION);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setInternalOpen(false), 0);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Dialog open={internalOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-800/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className={clsx(
            "flex min-h-full items-stretch justify-center p-4 text-center sm:p-0",
          )}>
          <DialogPanel
            transition
            className={clsx(
              "relative w-full max-w-md transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:max-w-lg sm:p-6 sm:data-closed:translate-y-0 sm:data-closed:scale-95",
              className,
            )}>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
