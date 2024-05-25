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
        <p>
          This form explores Unregister differences compared to shouldUnregister
        </p>
        <LinkButton to="unregister">Unregister</LinkButton>
        <p>Experience the form-state variants</p>
        <LinkButton to="formstate">Form State</LinkButton>
        <LinkButton to="formstate-async">Async Form State</LinkButton>
        <p>Different options to reset a form state</p>
        <LinkButton to="reset-partial">Partial Reset</LinkButton>
        <LinkButton to="reset-submit">Reset Submit</LinkButton>
        <p>Set Error</p>
        <LinkButton to="set-error">Set Error</LinkButton>
        <p>Get Field State</p>
        <LinkButton to="get-field-state">Get Field State</LinkButton>
        <p>Trigger</p>
        <LinkButton to="trigger">Trigger</LinkButton>
        <p>Controller</p>
        <LinkButton to="controller-one">Controller</LinkButton>
        <LinkButton to="controller-two">Controller Two</LinkButton>
        <p>Form Provider and useFormContext</p>
        <LinkButton to="context-provider">Provider Form</LinkButton>
        <p>New Note Form</p>
        <LinkButton to="new-note">New Note Form</LinkButton>
      </section>
    </div>
  );
};
