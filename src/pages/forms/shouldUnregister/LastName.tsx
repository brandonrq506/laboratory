import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { TextInput } from "@/components/form";

/* Features: Register - shouldUnregister
   - Conditional registration
   - Conditional unregistration
   - Conditional focus
   - Focus with select */

/**
 * To Play with the features on this concept:
 * - shouldUnregister: true
 * - shouldUnregister: false
 */

type FormValues = {
  firstName: string;
  lastName: string;
};

export const LastName = () => {
  const [hasLastName, setHasLastName] = useState(true);
  const { formState, handleSubmit, register, setFocus } = useForm<FormValues>({
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
          onChange={(e) => setHasLastName(e.target.checked)}
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
            shouldUnregister: true,
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
