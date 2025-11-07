import { useDeleteCategory } from "@/features/categories/api/tanstack/useDeleteCategory";
import { useNavigateBack } from "@/hooks";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button, Modal } from "@/components/core";
import { Field, Label } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { StateInputText } from "@/components/form";

import { CANCEL, CONFIRM } from "@/constants/actions";

import { categoryByIdQueryOptions } from "@/features/categories/api/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId/delete",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const navigateBack = useNavigateBack({ fallback: "/settings/categories" });

  const { categoryId } = Route.useParams();
  const { data } = useSuspenseQuery(categoryByIdQueryOptions(categoryId));
  const { mutate, isPending } = useDeleteCategory();
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    mutate(categoryId, {
      onSuccess: () => navigate({ to: "/settings/categories", replace: true }),
    });
  };

  const isConfirmDisabled = confirmText !== data.name || isPending;

  return (
    <Modal isOpen={true} onClose={navigateBack}>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-6 text-red-600"
            />
          </span>

          <div className="space-y-2 text-left">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Category
            </h2>

            <p className="text-sm text-gray-600">
              Deleting a category deletes all the activities and tasks
              associated with it. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          Type <span className="font-semibold">"{data.name}"</span> to confirm.
        </div>

        <Field>
          <Label className="block text-sm leading-6 font-medium text-gray-900">
            Confirmation
          </Label>
          <StateInputText
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
          />
        </Field>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={navigateBack}>
            {CANCEL}
          </Button>
          <Button
            variant="danger"
            isLoading={isPending}
            onClick={handleDelete}
            disabled={isConfirmDisabled}>
            {CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
