import { useForm } from "react-hook-form";

import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

export const Trigger = () => {
  const { control, formState, handleSubmit, register, trigger } =
    useForm<FormValues>({
      defaultValues: {
        firstName: "Brandon",
        lastName: "Ramirez",
        age: 17,
      },
    });
  const { errors } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <DevTool control={control} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          registration={register("firstName", {
            required: "First Name is required",
            minLength: { value: 10, message: "First Name is too short" },
          })}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          registration={register("lastName", {
            required: "Last Name is required",
            minLength: { value: 10, message: "Last Name is too short" },
          })}
          error={errors.lastName?.message}
        />
        <NumberInput
          label="Age"
          registration={register("age", {
            required: "Age is required",
            valueAsNumber: true,
            max: { value: 60, message: "You must be below retirement age." },
            min: { value: 18, message: "You must be above age." },
          })}
          error={errors.age?.message}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>

        <hr className="my-3" />

        <div className="flex flex-wrap gap-3">
          {/* Isolate render optimization only to single fields. */}
          <Button variant="danger" onClick={() => trigger("firstName")}>
            Trigger First Name
          </Button>

          <Button
            variant="danger"
            onClick={() => trigger(["firstName", "lastName"])}>
            Trigger First & Last name
          </Button>

          <Button variant="danger" onClick={() => trigger()}>
            Trigger all
          </Button>

          <Button
            variant="danger"
            onClick={() => trigger("firstName", { shouldFocus: true })}>
            Trigger First Name with Focus
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              trigger(["firstName", "lastName"], { shouldFocus: true })
            }>
            Trigger First & Last name with Focus
          </Button>

          {/* TODO: Trigger with async validation: https://www.youtube.com/watch?v=-bcyJCDjksE */}
        </div>
      </form>
    </div>
  );
};
