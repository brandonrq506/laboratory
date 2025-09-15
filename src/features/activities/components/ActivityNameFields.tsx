import { useFormContext } from "react-hook-form";

import { CreateForm } from "../types/createForm";
import { TextInput } from "@/components/form";

export const ActivityNameFields = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<CreateForm>();

  return (
    <>
      <TextInput
        autoFocus
        showAsterisk
        label="Name"
        placeholder="Shower"
        description="Used for reports and exports."
        error={errors.name?.message}
        registration={register("name", { required: "Name is required" })}
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
