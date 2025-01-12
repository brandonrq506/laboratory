import { useForm } from "react-hook-form";
import { useLogin } from "../api/tanstack/useLogin";

import { Button } from "@/components/core";
import { InputText } from "@/components/form";

import { LoginFormType } from "../types/loginForm";
import { SIGN_IN } from "@/constants/actions";
import { isAxiosError } from "axios";

const UNAUTHORIZED_CODE = 401;
const SERVER_ERROR_CODE = 500;

export const LoginForm = () => {
  const { mutate, isError, isPending, error } = useLogin();
  const { formState, handleSubmit, register } = useForm<LoginFormType>({
    defaultValues: {
      email_address: "",
      password: "",
    },
  });

  const { errors } = formState;

  const onSubmit = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        autoFocus
        label="Email"
        error={errors.email_address?.message}
        registration={register("email_address", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must contain @";
            }
          },
        })}
      />

      <InputText
        type="password"
        label="Password"
        error={errors.password?.message}
        registration={register("password", {
          required: "Password is required",
        })}
      />

      {isError && isAxiosError(error) && (
        <div className="text-xs text-red-500">
          {error.status === UNAUTHORIZED_CODE && "Incorrect Email / Password"}
          {error.status === SERVER_ERROR_CODE && "Server Error"}
        </div>
      )}

      <div className="mt-2 text-center">
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {SIGN_IN}
        </Button>
      </div>
    </form>
  );
};
