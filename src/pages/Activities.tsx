import { useForm } from "react-hook-form";

import {
  FileInput,
  NumberInput,
  Select,
  TextArea,
  TextInput,
} from "@/components/form";
import { Button } from "@/components/core";
import { ComboBoxV3 } from "@/experiments/ComboBox";
import { ServiceComboBox } from "./components/ServiceComboBox";

type InputFields = {
  name: string;
  age: number;
  gender: string;
  biography: string;
  images: FileList;
};

export const Activities = () => {
  const { register, handleSubmit, formState } = useForm<InputFields>();
  const { errors } = formState;

  const onSubmit = (data: InputFields) => console.log(data);

  return (
    <div className="min:h-screen rounded-lg border">
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
          registration={register("name", {
            required: "This is required.",
            minLength: { value: 5, message: "Name is too short" },
          })}
          error={errors.name?.message}
        />
        <br />
        <NumberInput
          label="Age"
          showAsterisk
          placeholder="24"
          className="w-1/3"
          description="How old are you?"
          registration={register("age", {
            required: "Your age is required",
            valueAsNumber: true,
            min: { value: 18, message: "You must be 18 years old" },
          })}
          error={errors.age?.message}
        />
        <br />
        <div className="w-1/3">
          <ComboBoxV3
            label="Testing"
            name="testing"
            showAsterisk
            options={[
              { value: 1, label: "Brandon" },
              { value: 2, label: "John" },
              { value: 3, label: "Doe" },
            ]}
            value={null}
            onChange={() => {}}
            onBlur={() => {}}
            ref={null}
          />
        </div>
        <br />
        <Select
          label="Gender"
          showAsterisk
          className="w-1/3"
          description="What are you?"
          registration={register("gender", {
            required: "You must select a gender",
          })}
          error={errors.gender?.message}
          options={[
            { label: "Select one...", value: -1 },
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
            { label: "Other", value: 3 },
          ]}
        />
        <br />
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
        <br />
        <FileInput
          label="Images"
          multiple
          showAsterisk
          className="w-1/3"
          dropAreaClassName="bg-white"
          description="Upload as many images as needed of your activity."
          registration={register("images", {
            required: "Upload at least one image",
          })}
          error={errors.images?.message}
        />
        <br />
        <div className="w-1/3">
          <ServiceComboBox />
        </div>

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
