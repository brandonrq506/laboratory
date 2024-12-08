import { FaceFrownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/core";

type Props = {
  refetch: () => void;
};

export const TaskErrorList = ({ refetch }: Props) => {
  return (
    <div className="rounded-md p-6 text-center font-light">
      <FaceFrownIcon
        aria-hidden
        className="mx-auto size-12 stroke-1 text-gray-400"
      />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Oh no!</h3>
      <p className="mt-1 text-sm text-gray-500">
        There was an error loading your tasks
      </p>
      <div className="mt-6">
        <Button
          onClick={refetch}
          startIcon={<PlusIcon aria-hidden className="size-5" />}>
          Try Again
        </Button>
      </div>
    </div>
  );
};
