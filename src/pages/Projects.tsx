import { useForm } from "react-hook-form";
import { Button } from "@/components/core";
import { TextInput } from "@/components/form";
import { DevTool } from "@hookform/devtools";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const Projects = () => {
  const { control, getValues, handleSubmit, register, formState } =
    useForm<FormData>();
  const { errors } = formState;

  const onSubmit = (data: FormData) => {data.confirmPassword};

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
          description="Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter."
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
