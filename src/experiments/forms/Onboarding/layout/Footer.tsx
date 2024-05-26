import { Button } from "@/components/core";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export const Footer = () => {
  return (
    <footer className="flex h-12 items-center justify-around rounded-b-xl border border-gray-100 bg-white shadow-sm">
      <Button
        variant="secondary"
        startIcon={<ChevronLeftIcon className="size-4" />}>
        Back
      </Button>
      <Button type="submit">Continue</Button>
    </footer>
  );
};
