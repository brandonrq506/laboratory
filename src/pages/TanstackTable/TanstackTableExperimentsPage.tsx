import { LinkButton } from "@/components/core";
import { PageHeader } from "@/components/layout";

export const TanstackTableExperimentsPage = () => {
  return (
    <div>
      <PageHeader title="Tanstack Table Experiments" />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5">
        <LinkButton to="first-attempt">First Attempt</LinkButton>
      </div>
    </div>
  );
};
