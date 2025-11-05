import { useFormContext } from "react-hook-form";

import { CreateForm } from "../types/create-form";
import { TextInput } from "@/components/form";

export const ActivityNameFields = () => {
  const {
    formState: { errors, dirtyFields },
    getValues,
    register,
    setValue,
  } = useFormContext<CreateForm>();

  const handleNameBlur = () => {
    if (!dirtyFields.name) {
      return;
    }

    const displayName = getValues("display_name");
    if (displayName.trim().length > 0) {
      return;
    }

    const nameValue = getValues("name");

    if (nameValue.trim().length === 0) {
      return;
    }

    setValue("display_name", nameValue, { shouldDirty: true });
  };

  return (
    <>
      <TextInput
        autoFocus
        showAsterisk
        label="Name"
        placeholder="Shower"
        description="Used for reports and exports."
        error={errors.name?.message}
        registration={register("name", {
          required: "Name is required",
          onBlur: handleNameBlur,
        })}
      />

      <TextInput
        label="Display Name"
        placeholder="Shower"
        description="What you will see on the UI."
        error={errors.display_name?.message}
        registration={register("display_name")}
      />
    </>
  );
};
