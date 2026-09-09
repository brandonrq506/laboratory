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
        className="text-foreground-faint mx-auto size-12 stroke-1"
      />
      <h3 className="text-foreground mt-2 text-sm font-semibold">Oh no!</h3>
      <p className="text-foreground-subtle mt-1 text-sm">
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
