import { useForm, FieldPath, Message } from "react-hook-form";
import { NumberInput, TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

export const SetError = () => {
  const {
    control,
    formState,
    handleSubmit,
    register,
    setError,
    // clearErrors
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "John",
      lastName: "Durazno",
      age: 30,
    },
  });
  const { errors, isValid } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <h1 className="text-2xl font-semibold">Set Error</h1>
      <hr className="mb-3" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          registration={register("firstName", {
            required: "First Name is required",
            minLength: { value: 3, message: "Minimum length is 3" },
            maxLength: { value: 10, message: "Maximum length is 15" },
          })}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          registration={register("lastName", {
            required: "Last Name is required",
            minLength: { value: 5, message: "Minimum length is 5" },
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
      </form>
      <h3 className="my-3 text-3xl font-bold">Testing Panel</h3>
      <p className="text-sm font-light">
        Some options are commented out to avoid Typescript errors*
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {/*
        This will not allow your form to be submitted even if the necessary changes are made.
        You need to setup a useEffect to run the cleanErrors() when the time comes
        */}

        {/* <Button
          variant="danger"
          onClick={() =>
            setError("inexistingField", {
              type: "custom",
              message: "custom message",
            })
          }>
          To inexisting field
        </Button>
        <Button
          variant="secondary"
          onClick={() => clearErrors("inexistingField")}>
          Clear inexisting
        </Button> */}

        {/* As long as the input itself passess all the Register rules, it is just an indication. */}
        <Button
          variant="danger"
          onClick={() =>
            setError(
              "firstName",
              {
                type: "custom",
                message: "That is a weak ass name",
              },
              { shouldFocus: true },
            )
          }>
          Name is Bad
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            const inputs: {
              name: FieldPath<FormValues>;
              type: string;
              message: Message;
            }[] = [
              {
                name: "firstName",
                type: "manual",
                message: "Your first name is terrib....",
              },
              {
                name: "lastName",
                type: "manual",
                message: "bly good!! It is awesome..",
              },
              {
                name: "age",
                type: "manual",
                message: "ly disgusting...",
              },
            ];

            inputs.forEach(({ name, type, message }) =>
              setError(name, { type, message }),
            );
          }}>
          Set multiple errors
        </Button>
      </div>
      <DevTool control={control} />
      <div className="mt-3">
        <h3 className="mb-3 text-3xl font-bold">Form State</h3>
        {/* <p>Is Dirty: {String(isDirty)}</p>
        <p>Dirty Fields: {Object.keys(dirtyFields).join(", ")}</p>
        <p>Touched Fields: {Object.keys(touchedFields).join(", ")}</p>
        <hr className="my-2" />
        <p>Is Submitted: {String(isSubmitted)}</p>
        <p>Is SubmitSuccessful: {String(isSubmitSuccessful)}</p>
        <p>Submit Count: {submitCount}</p>
        <hr className="my-2" /> */}
        <p>Is Valid: {String(isValid)}</p>
      </div>
    </div>
  );
};
