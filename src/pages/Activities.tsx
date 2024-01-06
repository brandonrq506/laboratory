import { useForm } from "react-hook-form";
import { TextInput } from "@/components/form";
import { Button } from "@/components/core";

type InputFields = {
  name: string;
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

        <div className="mt-4">
          <Button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
