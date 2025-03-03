import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { CategoryFormTaskExample } from "./CategoryFormTaskExample";
import { ColorSelect } from "@/features/colors/components";
import { EditForm } from "../types/editForm";
import { TextInput } from "@/components/form";

// TODO: Add type-safety to color. How do we know value 1 is white?
const defaultCategory: EditForm = {
  name: "",
  color: { value: 1, label: "white" },
};

type Props = {
  initialValues?: Partial<EditForm>;
  onSubmit: (data: EditForm) => void;
  submitButtonText: string;
};

export const CategoryForm = ({
  initialValues,
  onSubmit,
  submitButtonText,
}: Props) => {
  const { control, formState, handleSubmit, register } = useForm<EditForm>({
    values: { ...defaultCategory, ...initialValues },
  });

  const { errors, isDirty, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          showAsterisk
          label="Name"
          placeholder="Productive"
          error={errors.name?.message}
          registration={register("name", {
            required: "Name is required",
          })}
        />
        <ColorSelect control={control} name="color" />
      </div>

      <div className="my-4 rounded-md bg-gray-100 p-2">
        <CategoryFormTaskExample control={control} />
      </div>

      <div className="mt-2 flex justify-center">
        <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
