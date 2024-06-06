import { useForm } from "react-hook-form";

import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";

/**
 * To understand the reset imagine that by default it wants to reset everything.
 * And then you can tell it what NOT to reset.
 * reset(fields YES to reset, options of what NOT to reset)
 */

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

export const ResetPartial = () => {
  const { control, formState, handleSubmit, register, reset } =
    useForm<FormValues>({
      defaultValues: { firstName: "John", lastName: "Doe", age: 30 },
    });
  const {
    errors,
    isDirty,
    dirtyFields,
    touchedFields,
    isSubmitted,
    isSubmitSuccessful,
    isValid,
    submitCount,
  } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          registration={register("firstName", {
            required: "First Name is required",
            minLength: { value: 3, message: "Minimum length is 3" },
          })}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          registration={register("lastName", {
            required: "Last Name is required",
            validate: {
              noDoubleSpace: (value) =>
                value.includes("  ") ? "No double space allowed" : true,
              noNumber: (value) =>
                /\d/.test(value) ? "No numbers allowed" : true,
            },
          })}
          error={errors.lastName?.message}
        />
        <NumberInput
          label="Age"
          registration={register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: { value: 18, message: "Minimum age is 18" },
            max: { value: 99, message: "Maximum age is 99" },
          })}
          error={errors.age?.message}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>

        <h2 className="mt-3 text-2xl">Reset Controll Panel</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="danger" onClick={() => reset()}>
            Full
          </Button>
          {/*
          Think about it, when you do reset() is the same as doing reset(undefined).
          So yes, they behave exactly the same. Undefine is just useful to get access to the second argument.
          Which is the options objects where you have more control over what is reset.
          */}
          <Button variant="danger" onClick={() => reset(undefined)}>
            Undefined
          </Button>

          {/*
          Downside of the following is: It will reset age and keep first and last name untouched.
          However it will reset ALL Dirty & Touched state to false, including those of first and last name.
          Bottom line: First and last name can be completely different from default values, and they will
          appear as clean and untouched.
          If you want to reset just "Age" and keep the rest as is, you must use resetField();
          */}
          <Button variant="danger" onClick={() => reset({ age: 30 })}>
            Just Age
          </Button>

          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepErrors: true })}>
            Keep Errors
          </Button>

          {/*
          Keep Dirty is true (At the form level, not at the field level)
          However, for it to show, you can't simply see it on the DevTools.
          You must have something subscribe to it, meaning:
          De-structure isDirty from "formState" and use it somewhere (Show is in the UI). Then it works.
          Must be due to the Proxy arquitecure of the formState object.
          */}
          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepDirty: true })}>
            Keep Dirty
          </Button>

          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepValues: true })}>
            Keep Values
          </Button>

          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepIsSubmitted: true })}>
            Keep Submitted
          </Button>

          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepTouched: true })}>
            Keep Touched
          </Button>

          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepIsValid: true })}>
            Keep isValid
          </Button>

          <Button
            variant="danger"
            onClick={() => reset(undefined, { keepSubmitCount: true })}>
            Keep Submit Count
          </Button>
        </div>
      </form>
      <DevTool control={control} />
      <div className="mt-3">
        <h3 className="mb-3 text-3xl font-bold">Form State</h3>
        <p>Is Dirty: {String(isDirty)}</p>
        <p>Dirty Fields: {Object.keys(dirtyFields).join(", ")}</p>
        <p>Touched Fields: {Object.keys(touchedFields).join(", ")}</p>
        <hr className="my-2" />
        <p>Is Submitted: {String(isSubmitted)}</p>
        <p>Is SubmitSuccessful: {String(isSubmitSuccessful)}</p>
        <p>Submit Count: {submitCount}</p>
        <hr className="my-2" />
        <p>Is Valid: {String(isValid)}</p>
      </div>
    </div>
  );
};
