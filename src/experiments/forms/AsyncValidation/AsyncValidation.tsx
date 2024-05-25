import { useForm } from "react-hook-form";
import { TextInput } from "@/components/form";
import { Button } from "@/components/core";
import { DevTool } from "@hookform/devtools";
import { getUser, getUserByPhone } from "../api";

type FormValues = {
  id: number;
  name: string;
  userName: string;
  phone: string;
};

export const AsyncValidation = () => {
  const { control, formState, handleSubmit, register, setValue } =
    useForm<FormValues>({
      defaultValues: {
        id: 1,
        userName: "",
        phone: "",
      },
    });
  const { errors, isValidating } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  const onPhoneChange = async (phone: string) => {
    const VALID_PHONE_LENGTH = 10;
    const isEmpty = phone.length === 0;
    const isInvalidLength = phone.length !== VALID_PHONE_LENGTH;
    if (isEmpty || isInvalidLength) return;

    const user = await getUserByPhone(phone);
    if (user.length === 0) return;

    const { id, name } = user[0];
    setValue("id", id);
    setValue("name", name);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
        <TextInput
          label="Name"
          registration={register("name", {
            required: "Name is required",
          })}
        />
        <br />
        <TextInput
          label="Phone"
          description="Fill your form first. We will try to autocomplete other information."
          registration={register("phone", {
            required: "Phone is required",
            onChange: (e) => onPhoneChange(e.target.value),
          })}
        />
        <br />
        <TextInput
          label="Username"
          description="Your username should be unique. We will validate it for you."
          registration={register("userName", {
            required: "Username is required",
            validate: async (value) => {
              if (!value) return "Username is required";
              const user = await getUser(value);
              if (user.length > 0) return "Username is already taken";
              return true;
            },
          })}
          error={errors.userName?.message}
        />
        <p>{isValidating && "We are validating this Username"}</p>
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
