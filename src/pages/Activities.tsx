import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { TextArea, TextInput, FileInput } from "@/components/form";
import { Button } from "@/components/core";

type InputFields = {
  name: string;
  biography: string;
  images: FileList;
};

export const Activities = () => {
  const { register, handleSubmit, formState, getValues, setValue, control } =
    useForm<InputFields>();
  const { errors } = formState;

  const onSubmit = (data: InputFields) => console.log(data);

  const updateFiles = (files: FileList) => {
    const existingFiles = getValues("images");
    const dataTransfer = new DataTransfer();

    for (let i = 0; i < existingFiles.length; i++) {
      dataTransfer.items.add(existingFiles[i]);
    }
    for (let i = 0; i < files.length; i++) {
      dataTransfer.items.add(files[i]);
    }

    setValue("images", dataTransfer.files, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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
          registration={register("name", {
            required: "This is required.",
            minLength: { value: 5, message: "Name is too short" },
          })}
          error={errors.name?.message}
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
          onFilesDropped={updateFiles}
          className="w-1/3"
          dropAreaClassName="bg-white"
          description="Upload as many images as needed of your activity."
          registration={register("images")}
          error={errors.images?.message}
        />
        <div className="mt-4">
          <Button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
            Submit
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
