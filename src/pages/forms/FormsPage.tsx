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
        <p>
          Allows to enter a First Name and optionally a last name, the last name
          if not entered, is not sent in the POST request
        </p>
        <LinkButton to="shouldunregister-1">Should Unregister</LinkButton>
        <p>
          Variable password security based on Select, as well as ensuring
          password and confirmation password are the same
        </p>
        <LinkButton to="deps-1">Deps</LinkButton>
      </section>
    </div>
  );
};
