import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { CategorySelect } from "@/features/categories/components";
import { TextInput } from "@/components/form";

import { CreateForm } from "../types/createForm";
import { TimeInputs } from "./TimeInputs";
import { autoPopulateDisplayName } from "./utils/autoPopulateDisplayName";

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
  const { control, formState, getValues, handleSubmit, register, setValue } =
    useForm<CreateForm>({
      values: { ...defaultActivity, ...initialValues },
    });
  const { errors, isSubmitting, dirtyFields } = formState;

  const handleNameBlur = async () => {
    autoPopulateDisplayName({
      getValues,
      setValue,
      dirtyFields,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          autoFocus
          showAsterisk
          label="Name"
          placeholder="Shower"
          description="Used for reports and exports."
          error={errors.name?.message}
          registration={{
            ...register("name", { 
              required: "Name is required",
              onBlur: handleNameBlur,
            }),
          }}
        />

        <TextInput
          label="Display Name"
          placeholder="Shower"
          description="What you will see on the UI."
          error={errors.display_name?.message}
          registration={register("display_name")}
        />

        <CategorySelect
          control={control}
          name="category_id"
          rules={{ required: "A category must be selected" }}
        />

        <TimeInputs
          control={control}
          errors={errors}
          getValues={getValues}
          register={register}
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
