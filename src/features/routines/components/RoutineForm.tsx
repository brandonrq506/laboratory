import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { TextInput } from "@/components/form";

import { RoutineForm as RoutineFormType } from "../types/routineForm";

const defaultRoutine: RoutineFormType = {
  name: "",
};

type Props = {
  initialValues?: Partial<RoutineFormType>;
  onSubmit: (data: RoutineFormType) => void;
  submitButtonText: string;
};

export const RoutineForm = ({
  initialValues,
  onSubmit,
  submitButtonText,
}: Props) => {
  const { formState, handleSubmit, register } = useForm<RoutineFormType>({
    values: { ...defaultRoutine, ...initialValues },
  });
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <TextInput
        autoFocus
        showAsterisk
        label="Name"
        placeholder="Before Sleep"
        error={errors.name?.message}
        registration={register("name", {
          required: "Name is required",
        })}
      />

      <div className="mt-2 flex justify-center">
        <Button type="submit" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
