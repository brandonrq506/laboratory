import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { TextArea } from "@/components/form";

type FormValues = {
  note: string;
};

export const NewNoteForm = () => {
  const { formState, handleSubmit, register } = useForm<FormValues>();
  const { errors } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          label="Add a new Note"
          showAsterisk
          registration={register("note", {
            required: "You must type something before submitting.",
          })}
          error={errors.note?.message}
        />
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};
