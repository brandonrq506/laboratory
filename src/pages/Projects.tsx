import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";
import { TextInput } from "@/components/form";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const Projects = () => {
  const { control, getValues, handleSubmit, register, formState } =
    useForm<FormData>();
  const { errors } = formState;

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Username"
          showAsterisk
          registration={register("username", {
            required: "Username is required",
          })}
          description="This will how other users perceive you"
          error={errors.username?.message}
        />
        <br />
        <TextInput
          label="Password"
          type="password"
          registration={register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          description="Minimum of 8 characters is required to be secure."
          error={errors.password?.message}
        />
        <br />
        <TextInput
          label="Confirm Password"
          type="password"
          registration={register("confirmPassword", {
            required: "Password confirmation is required",
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          description="Please confirm your password"
          error={errors.confirmPassword?.message}
        />

        <Button type="submit">Submit</Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
