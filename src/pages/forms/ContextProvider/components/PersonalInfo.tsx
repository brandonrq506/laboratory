import { useFormContext } from "react-hook-form";
import { NumberInput, TextInput } from "@/components/form";
import { FormValues } from "../types";

export const PersonalInfo = () => {
  const { formState, register } = useFormContext<FormValues>();
  const { errors } = formState;

  return (
    <>
      <TextInput
        showAsterisk
        label="First Name"
        description="We will use this information to look up your account"
        registration={register("firstName", {
          required: "First Name is required",
        })}
        error={errors.firstName?.message}
      />
      <br />
      <TextInput
        showAsterisk
        label="Last Name"
        description="If you have two, please enter both names here"
        registration={register("lastName", {
          required: "This is mandatory for your registration",
        })}
        error={errors.lastName?.message}
      />
      <br />
      <NumberInput
        showAsterisk
        label="Age"
        description="We will use this information to determine your eligibility"
        registration={register("age", {
          required: "Age is required",
          min: { value: 18, message: "You must be at least 18 years old" },
        })}
        error={errors.age?.message}
      />
    </>
  );
};
