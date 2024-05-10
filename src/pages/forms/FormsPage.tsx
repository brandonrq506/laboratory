import { LinkButton } from "@/components/core";

export const FormsPage = () => {
  return (
    <div className="min-h-full rounded-md bg-white p-3 shadow-sm">
      <h1 className="m-2 text-center text-lg">Forms Page</h1>

      <section className="my-4">
        <h2>Main Projects</h2>
        <LinkButton to="new-location">Create Location</LinkButton>
      </section>

      <section className="my-4">
        <h2 className="font-bold">ShouldUnregister</h2>
        <LinkButton to="shouldunregister-1">Optional Last Name</LinkButton>
        <LinkButton to="shouldunregister-2">Dynamic pswd strengh</LinkButton>
      </section>
    </div>
  );
};
