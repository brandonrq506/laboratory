import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core/Button/IconButton";

export const DragHandle = () => {
  return (
    <IconButton>
      <AdjustmentsHorizontalIcon className="size-5 cursor-grab text-gray-400 hover:text-gray-600" />
      <span className="sr-only">Drag handle</span>
    </IconButton>
  );
};
