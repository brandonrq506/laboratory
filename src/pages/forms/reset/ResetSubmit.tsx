import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

export const ResetSubmit = () => {
  const { control, formState, handleSubmit, register, reset } =
    useForm<FormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        age: 0,
      },
    });
  const { errors, isSubmitSuccessful } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          registration={register("firstName", {
            required: "First Name is required",
          })}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          registration={register("lastName", {
            required: "Last Name is required",
          })}
          error={errors.lastName?.message}
        />
        <NumberInput
          label="Age"
          registration={register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
          error={errors.age?.message}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
