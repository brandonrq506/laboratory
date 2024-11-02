import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { TextInput } from "@/components/form";

/* Questions:
   
   - Fields = 0 by default, meaning use adds projects as he clicks.
   - Video shows 1 field by default, meaning user gets one by default with default information.
   - Experiment: Create a pre-defined array of Projects and see if they are all added to form.
   - Problem: These will be added to the form values. You need them to be like a 'Add Button'.
   
   ANSWER: By adding a select, but not registering it, you can allow the user to choose Projects
   and add those projects to the form. By default projects on the Select are not added to the form.
   The use must click on them to add them. */

type FormData = {
  firstName: string;
  lastName: string;
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
};

export const AddingFromSelect = () => {
  const { register, formState, handleSubmit, control } = useForm<FormData>();
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control,
    rules: {
      required: "You must specifiy at least one project",
      maxLength: {
        value: 4,
        message: "4 is the maximum number of projects concurrently",
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
          error={errors.firstName?.message}
        />
        <br />

        <div>
          <label>
            Choose from Available Projects:
            <br />
            <select
              name="testing"
              onChange={({ target: { options, selectedIndex } }) => {
                const text = options[selectedIndex].text;
                append({
                  name: text,
                  description: "",
                  technologies: [""],
                });
              }}>
              <option value="1">Project 1</option>
              <option value="2">Project 2</option>
              <option value="3">Project 3</option>
              <option value="4">Project 4</option>
            </select>
          </label>
        </div>

        <Button
          variant="secondary"
          className="mt-6"
          onClick={() =>
            append({
              name: "",
              description: "Here is a default description",
              technologies: [""],
            })
          }>
          Add Project
        </Button>

        <div className="mt-6 w-4/5">
          <label className="h-1 text-xl font-semibold">List of Projects</label>
          <p className="text-sm font-light text-red-500">
            {errors.projects?.root?.message}
          </p>
          <div>
            {fields.map((field, index) => (
              <div
                className="rounded-lg border bg-white p-2 shadow-sm"
                key={field.id}>
                <div>
                  <TextInput
                    showAsterisk
                    label="Name"
                    placeholder="Project Name"
                    description="The name of your project"
                    registration={register(`projects.${index}.name`, {
                      required: "Project Name is required",
                    })}
                    error={errors.projects?.[index]?.name?.message}
                  />
                </div>
                <div>
                  <TextInput
                    showAsterisk
                    label="Description"
                    placeholder="Project Description"
                    description="The description of your project"
                    registration={register(`projects.${index}.description`, {
                      required: "Project Description is required",
                    })}
                    error={errors.projects?.[index]?.description?.message}
                  />
                </div>
                <div>
                  <TextInput
                    showAsterisk
                    label="Technologies"
                    placeholder="Project Technologies"
                    description="The technologies used in your project"
                    registration={register(`projects.${index}.technologies`, {
                      required: "Project Technologies is required",
                    })}
                    error={errors.projects?.[index]?.technologies?.message}
                  />
                </div>
                <Button variant="danger" onClick={() => remove(index)}>
                  Delete
                </Button>
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
