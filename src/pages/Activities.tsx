import { useForm } from "react-hook-form";
import { TextArea, TextInput } from "@/components/form";
import { Button } from "@/components/core";

type InputFields = {
  name: string;
  biography: string;
};

export const Activities = () => {
  const { register, handleSubmit, formState } = useForm<InputFields>();
  const { errors } = formState;

  const onSubmit = (data: InputFields) => console.log(data);

  return (
    <div className="h-screen rounded-lg border">
      <div className="text-center">
        <h4 className="text-lg font-semibold">Activities</h4>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="m-4">
        <TextInput
          label="Name"
          showAsterisk
          placeholder="First Name"
          wrapperClassName="w-1/3"
          description="The one your Mom chose for you."
          registration={register("name", { required: "This is required." })}
          error={errors.name?.message}
        />

        <TextArea
          label="Biography"
          showAsterisk
          wrapperClassName="w-1/3"
          description="Tell us about yourself."
          placeholder="Write as much as you want about you..."
          registration={register("biography", {
            required: "TELL US!!! What are you hiding???",
          })}
          error={errors.biography?.message}
        />

        <div className="mt-4">
          <Button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
