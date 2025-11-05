import { FormProvider, useForm } from "react-hook-form";

import { ActivityDurationFields } from "./ActivityDurationFields";
import { ActivityNameFields } from "./ActivityNameFields";
import { Button } from "@/components/core";
import { CategorySelect } from "@/features/categories/components";
import { CreateForm } from "../types/create-form";

const defaultActivity: CreateForm = {
  category_id: null,
  display_name: "",
  exp_time_hours: 0,
  exp_time_minutes: 0,
  max_time_hours: 0,
  max_time_minutes: 0,
  name: "",
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
  const methods = useForm<CreateForm>({
    values: { ...defaultActivity, ...initialValues },
  });
  const {
    control,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
          <ActivityNameFields />

          <CategorySelect
            control={control}
            name="category_id"
            rules={{ required: "A category must be selected" }}
          />

          <ActivityDurationFields />
        </div>

        <div className="mt-2 flex justify-center">
          <Button type="submit" isLoading={isSubmitting}>
            {submitButtonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
