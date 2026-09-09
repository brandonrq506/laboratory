import { Battery50Icon } from "@heroicons/react/24/solid";

export const SectionUnderConstruction = () => {
  return (
    <div className="border-input-border flex flex-col-reverse items-center justify-center rounded-lg border border-dashed p-4 sm:flex-col md:flex-row">
      <Battery50Icon className="text-warning-indicator size-8" />
      <h2 className="ml-0 text-xl font-semibold md:ml-4">
        Under construction
        <span className="hidden sm:inline-block">, come back later</span>
      </h2>
    </div>
  );
};
