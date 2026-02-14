import { ResponsiveLinkButton } from "@/components/core";

import { ADD } from "@/constants/actions";
import { CATEGORY } from "@/constants/entities";
import { PlusIcon } from "@heroicons/react/24/outline";

export const NewCategoryButton = () => {
  return (
    <ResponsiveLinkButton
      to="/settings/categories/new"
      size="lg"
      startIcon={<PlusIcon className="size-5" aria-hidden />}>
      {`${ADD} ${CATEGORY}`}
    </ResponsiveLinkButton>
  );
};
