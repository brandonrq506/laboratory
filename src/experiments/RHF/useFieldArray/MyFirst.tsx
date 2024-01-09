import { useForm, useFieldArray } from "react-hook-form";
import { TextInput } from "@/components/form";
import { Button } from "@/components/core";

/* 
Greatness:
- Complete functional useFieldsArray
- Has dynamic delete, can't delete first project
- One project is by default and has 2 technologies by default
- Other projects will required 1 technology and secondary is optional
- Optional technology has been set to be undefined by default
*/

type FormData = {
  firstName: string;
  lastName: string;
  projects: {
    name: string;
    description: string;
    technologies: (string | undefined)[];
  }[];
};

export const MyFirst = () => {
  const { register, formState, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      firstName: "Sr. Brandon",
      lastName: "Ramirez Quiros",
      projects: [
        {
          name: "Learning RoR",
          description: "I want to own those bitches on Back-End",
          technologies: ["Ruby", "Ruby on Rails"],
        },
      ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control,
    rules: {
      required: "You must specifiy at least two projects",
      minLength: {
        value: 2,
        message: "You must specifiy at least two projects",
      },
      maxLength: {
        value: 4,
        message: "4 is the maximum number of concurrent projects",
      },
    },
  });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          showAsterisk
          label="First Name"
          placeholder="Brandon"
          description="The first part of your name"
          registration={register("firstName", {
            required: "First Name is required",
          })}
          error={errors.firstName?.message}
        />
        <br />
        <TextInput
          showAsterisk
          label="Last Name"
          placeholder="Ramirez"
          description="The second part of your name"
          registration={register("lastName", {
            required: "Last Name is required",
          })}
          error={errors.lastName?.message}
        />
        <br />
        <div className="mt-6 w-4/5">
          <label className="h-1 text-xl font-semibold">List of Projects</label>
          <Button
            variant="secondary"
            className="ml-4"
            onClick={() =>
              append({
                name: "",
                description: "",
                technologies: [""],
              })
            }>
            Add Project
          </Button>
          <p className="text-sm font-light text-red-500">
            {errors.projects?.root?.message}
          </p>

          <div>
            {fields.map((field, index) => (
              <div
                className="my-3 rounded-lg border border-gray-200 bg-white p-4 shadow-md"
                key={field.id}>
                <TextInput
                  showAsterisk
                  label="Project Name"
                  description="Make sure your name is clear"
                  registration={register(`projects.${index}.name`, {
                    required: "It is required to name your project",
                  })}
                  error={errors.projects?.[index]?.name?.message}
                />
                <br />
                <TextInput
                  showAsterisk
                  label="Project Description"
                  description="A lengthy description is better than an ambiguous one"
                  registration={register(`projects.${index}.description`, {
                    required:
                      "Without description is hard to follow your dreams",
                  })}
                  error={errors.projects?.[index]?.description?.message}
                />
                <br />
                <TextInput
                  showAsterisk
                  label="Technology #1"
                  description="Primary Technology"
                  registration={register(`projects.${index}.technologies.0`, {
                    required: "At least one technology is required",
                  })}
                  error={errors.projects?.[index]?.technologies?.[0]?.message}
                />
                <TextInput
                  label="Technology #2"
                  description="Secondary Technology"
                  registration={register(`projects.${index}.technologies.1`, {
                    setValueAs: () => undefined,
                  })}
                  error={errors.projects?.[index]?.technologies?.[1]?.message}
                />

                {index > 0 && (
                  <Button
                    variant="danger"
                    size="xs"
                    className="mt-1"
                    onClick={() => remove(index)}>
                    {`Delete Project ${index + 1}`}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
