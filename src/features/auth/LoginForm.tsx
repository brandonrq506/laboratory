import { Button } from "@/components/core";
import { InputText } from "@/components/form";
import { SIGN_IN } from "@/constants/actions";
import { useForm } from "react-hook-form";

type FormType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { formState, handleSubmit, register } = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        autoFocus
        showAsterisk
        label="Email"
        error={errors.email?.message}
        registration={register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must contain @";
            }
          },
        })}
      />

      <InputText
        showAsterisk
        type="password"
        label="Password"
        error={errors.password?.message}
        registration={register("password", {
          required: "Password is required",
        })}
      />

      <div className="mt-2 text-center">
        <Button type="submit">{SIGN_IN}</Button>
      </div>
    </form>
  );
};
