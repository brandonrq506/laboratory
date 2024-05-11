import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TextInput } from "@/components/form";
import { Button } from "@/components/core";

/*
 * Features: Unregister
 * - Truly seems like a programmatic way to remove a field from the form
 * - as opposed to shouldUnregister, which is more of a declarative way.
 */

type FormValues = {
  firstName: string;
  lastName: string;
};

export const Unregister = () => {
  const [hasLastName, setHasLastName] = useState(true);
  const { formState, handleSubmit, register, setFocus, unregister } =
    useForm<FormValues>({
      defaultValues: {
        firstName: "Brandon",
        lastName: "Ramirez",
      },
    });
  const { errors } = formState;

  const onSubmit = (data: FormValues) => console.log(data);

  useEffect(() => {
    if (hasLastName) setFocus("lastName");
  }, [hasLastName, setFocus]);

  useEffect(() => {
    setFocus("firstName", { shouldSelect: true });
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="First Name"
        registration={register("firstName", {
          required: "First name is required.",
        })}
        error={errors.firstName?.message}
      />

      <div>
        <label htmlFor="hasLastName" className="mt-3 block">
          Has Last Name
        </label>
        <input
          id="hasLastName"
          type="checkbox"
          checked={hasLastName}
          onChange={(e) => {
            const isChecked = e.target.checked;
            if (!isChecked) unregister("lastName");
            setHasLastName(isChecked);
          }}
        />
      </div>

      {hasLastName && (
        <TextInput
          label="Last Name"
          registration={register("lastName", {
            required: "If you have a last name, you must provide it.",
            validate: {
              noNumbers: (value) =>
                !/\d/.test(value) || "Last name cannot contain numbers.",
              noSequentialSpaces: (value) =>
                !/\s{2,}/.test(value) ||
                "Last name cannot contain sequential spaces.",
            },
          })}
          error={errors.lastName?.message}
        />
      )}
      <Button type="submit" className="mt-3">
        Submit
      </Button>
    </form>
  );
};
