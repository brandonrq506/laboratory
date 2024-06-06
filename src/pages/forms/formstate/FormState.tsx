import { useForm } from "react-hook-form";

import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";

/**
 * Validations missing in this form:
 * - isLoading - As we don't have async loading of default values.
 * - validatingFields - As we don't have any Async validation.
 */

const RESPONSE_TIME = 2000;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

export const FormState = () => {
  const { control, formState, handleSubmit, register, reset } =
    useForm<FormValues>({
      defaultValues: {
        firstName: "Brandon",
        lastName: "Ramirez",
        age: 25,
      },
    });
  const {
    isDirty,
    dirtyFields,
    touchedFields,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
    isValid,
    isValidating,
    errors,
  } = formState;

  const onSubmit = async (data: FormValues) => {
    await sleep(RESPONSE_TIME);
    console.log(data);
  };

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          description="So we can identify you"
          registration={register("firstName")}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          description="Optional"
          registration={register("lastName")}
          error={errors.lastName?.message}
        />
        <NumberInput
          label="Age"
          description="If you are alive, you must have an age."
          registration={register("age", {
            required: "Give it to us.",
            valueAsNumber: true,
            min: { value: 18, message: "You must be 18 years old." },
            max: { value: 100, message: "You must be under 66 years old." },
            validate: {
              positive: (value) => value > 0 || "Really???",
            },
          })}
          error={errors.age?.message}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>
        <Button variant="danger" onClick={() => reset()} className="ml-3 mt-3">
          Reset
        </Button>
      </form>
      <DevTool control={control} />
      <div className="mt-3">
        <h3 className="mb-3 text-3xl font-bold">Form State</h3>
        <p>Is Dirty: {String(isDirty)}</p>
        <p>Dirty Fields: {Object.keys(dirtyFields).join(", ")}</p>
        <p>Touched Fields: {Object.keys(touchedFields).join(", ")}</p>
        <hr className="my-2" />
        <p>Is Submitting: {String(isSubmitting)}</p> {/* Hard to see */}
        <p>Is Submitted: {String(isSubmitted)}</p>
        <p>Is SubmitSuccessful: {String(isSubmitSuccessful)}</p>
        <p>Submit Count: {submitCount}</p>
        <hr className="my-2" />
        <p>Is Valid: {String(isValid)}</p>
        <p>Is Validating: {String(isValidating)}</p> {/* Hard to see */}
      </div>
    </div>
  );
};
