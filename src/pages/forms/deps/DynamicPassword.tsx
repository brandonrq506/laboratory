import { RegisterOptions, useForm } from "react-hook-form";
import { Button } from "@/components/core";
import { TextInput } from "@/components/form";

/**
 * Features: Register - deps
 * - Dynamic rules.
 * - Dependent verification.
 *  - When severy is updated, password is checked for compliance.
 *  - When password is updated, confirmPassword is checked for equality.
 */

const highSecurity: RegisterOptions = {
  required: "Password is required",
  minLength: {
    value: 12,
    message: "Password must be at least 12 characters",
  },
  pattern: {
    value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,}$/,
    message:
      "Password must contain uppercase, lowercase, one number, and one special character",
  },
  deps: ["confirmPassword"],
};

const mediumSecurity: RegisterOptions = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: "Password must contain uppercase, lowercase, and number",
  },
  deps: ["confirmPassword"],
};

const lowSecurity: RegisterOptions = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    message: "Password must contain uppercase and lowercase",
  },
  deps: ["confirmPassword"],
};

type SecurityLevel = "High" | "Medium" | "Low";

const getPasswordValidations = (securityLevel: SecurityLevel) => {
  switch (securityLevel) {
    case "High":
      return highSecurity;
    case "Medium":
      return mediumSecurity;
    case "Low":
      return lowSecurity;
    default:
      return lowSecurity;
  }
};

type FormData = {
  securityLevel: SecurityLevel;
  password: string;
  confirmPassword: string;
};

export const DynamicPassword = () => {
  const { formState, getValues, handleSubmit, register, watch } =
    useForm<FormData>({
      defaultValues: {
        securityLevel: "Medium",
        password: "",
        confirmPassword: "",
      },
    });
  const { errors } = formState;
  const onSubmit = (data: FormData) => console.log(data);

  const securityLevel = watch("securityLevel");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="securityLevel">Security Level</label>
        <select {...register("securityLevel", { deps: ["password"] })}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <TextInput
        label="Password"
        type="password"
        registration={register(
          "password",
          getPasswordValidations(securityLevel),
        )}
        error={errors.password?.message}
      />
      <TextInput
        label="Confirm Password"
        type="password"
        registration={register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("password") || "The passwords do not match",
        })}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};
