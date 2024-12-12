import { useForm } from "react-hook-form";

import { InputText, TimeInput } from "@/components/form";
import { Button } from "@/components/core";
import { CategorySelect } from "@/features/categories/components";
import { CreateForm } from "../types/createForm";

const defaultActivity: CreateForm = {
  name: "",
  avg_time: "",
  max_time: "",
  category_id: null,
};

type Props = {
  initialValues?: Partial<CreateForm>;
  onSubmit: (data: CreateForm) => void;
  submitButtonText: string;
};

export const ActivityForm = ({
  initialValues,
  onSubmit,
  submitButtonText,
}: Props) => {
  const { control, formState, handleSubmit, register } = useForm<CreateForm>({
    defaultValues: { ...defaultActivity, ...initialValues },
  });
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <InputText
          autoFocus
          showAsterisk
          label="Name"
          placeholder="Shower"
          error={errors.name?.message}
          registration={register("name", {
            required: "Name is required",
          })}
        />

        <CategorySelect
          control={control}
          name="category_id"
          rules={{ required: "A category must be selected" }}
        />

        <TimeInput
          label="Avg. Time"
          error={errors.avg_time?.message}
          registration={register("avg_time", {
            required: "Required to handle thresholds",
            min: { value: "00:01", message: "Must be at least 1 minute" },
          })}
        />

        <TimeInput
          label="Max. Time"
          error={errors.max_time?.message}
          registration={register("max_time")}
        />
      </div>

      <div className="mt-2 flex justify-center">
        <Button type="submit" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
