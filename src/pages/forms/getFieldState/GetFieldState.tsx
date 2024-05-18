import { useForm } from "react-hook-form";
import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

export const GetFieldState = () => {
  const { control, formState, handleSubmit, register, getFieldState } =
    useForm<FormValues>({
      defaultValues: {
        firstName: "John",
        lastName: "Durazno",
        age: 30,
      },
    });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          registration={register("firstName", {
            required: "First name is required.",
            minLength: { value: 3, message: "First name too short" },
            maxLength: { value: 10, message: "First name too long" },
          })}
        />
        <p>{getFieldState("firstName", formState).isDirty && "Dirty"}</p>
        <p>{getFieldState("firstName", formState).isTouched && "Touched"}</p>
        <p>{getFieldState("firstName", formState).invalid && "Invalid"}</p>
        <p>{getFieldState("firstName", formState).error?.message}</p>

        <TextInput
          label="Last Name"
          registration={register("lastName", {
            required: "Last name is required",
            maxLength: { value: 5, message: "Last name too long" },
            validate: (value) => value !== "Doe" || "Last name cannot be Doe",
          })}
        />
        <p>{getFieldState("lastName", formState).isDirty && "Dirty"}</p>
        <p>{getFieldState("lastName", formState).isTouched && "Touched"}</p>
        <p>{getFieldState("lastName", formState).invalid && "Invalid"}</p>
        <p>{getFieldState("lastName", formState).error?.message}</p>

        <NumberInput
          label="Age"
          registration={register("age", {
            valueAsNumber: true,
            min: { value: 18, message: "You must be above age." },
            max: { value: 60, message: "You must be below retirement age." },
          })}
        />
        <p>{getFieldState("age", formState).isDirty && "Dirty"}</p>
        <p>{getFieldState("age", formState).isTouched && "Touched"}</p>
        <p>{getFieldState("age", formState).invalid && "Invalid"}</p>
        <p>{getFieldState("age", formState).error?.message}</p>

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
