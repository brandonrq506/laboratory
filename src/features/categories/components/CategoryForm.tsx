import { useForm } from "react-hook-form";

import { BackspaceIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ColorSelect } from "@/features/colors/components";
import { EditForm } from "../types/editForm";
import { IconButton } from "@/components/core";
import { InputText } from "@/components/form";

// TODO: Add type-safety to color. How do we know value 1 is white?
const defaultCategory: EditForm = {
  name: "",
  color: { value: 1, label: "white" },
};

type Props = {
  initialValues?: Partial<EditForm>;
  onSubmit: (data: EditForm) => void;
};

export const CategoryForm = ({ initialValues, onSubmit }: Props) => {
  const { control, formState, handleSubmit, register, reset } =
    useForm<EditForm>({
      values: { ...defaultCategory, ...initialValues },
    });

  const { errors, isDirty } = formState;

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex items-end">
      <div className="flex gap-4">
        <InputText
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

      {isDirty && (
        <div className="flex gap-2">
          <IconButton type="submit">
            <span className="sr-only">Save</span>
            <CloudArrowUpIcon className="size-5" aria-hidden />
          </IconButton>
          <IconButton
            type="reset"
            variant="dangerOutline"
            onClick={() => reset()}>
            <span className="sr-only">Reset</span>
            <BackspaceIcon className="size-5" aria-hidden />
          </IconButton>
        </div>
      )}
    </form>
  );
};
