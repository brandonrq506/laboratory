import { LinkButton } from "@/components/core";

export const FormsPage = () => {
  return (
    <div className="min-h-full rounded-md bg-white p-3 shadow-sm">
      <h1>Forms Page</h1>
      <LinkButton to="new-location">Create Location</LinkButton>
    </div>
  );
};
