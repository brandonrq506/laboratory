import { ComboBox, NumberInput } from "@/components/form";
import { Controller, useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { Option } from "@/types/core";

const favFoods: Option[] = [
  { value: 1, label: "Pizza" },
  { value: 2, label: "Burger" },
  { value: 3, label: "Sushi" },
];

const favColors: Option[] = [
  { value: 1, label: "Red" },
  { value: 2, label: "Green" },
  { value: 3, label: "Blue" },
];

export const FavoritesInfo = () => {
  const { formState, register } = useFormContext<FormValues>();
  const { errors } = formState;

  return (
    <>
      <Controller
        name="favFood"
        render={({ field, fieldState }) => (
          <ComboBox
            showAsterisk
            label="Favorite Food"
            description="Important to tailor-made your cuisine experience"
            options={favFoods}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            ref={field.ref}
            error={fieldState.error?.message}
          />
        )}
        rules={{
          required: "How on earth will we know what to serve you!? Think MF!",
        }}
      />
      <br />
      <Controller
        name="favColor"
        render={({ field, fieldState }) => (
          <ComboBox
            label="Favorite Color"
            description="To make a custom T-shirt as welsome gift"
            options={favColors}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            ref={field.ref}
            error={fieldState.error?.message}
          />
        )}
      />
      <br />
      <NumberInput
        label="Group size"
        description="How many people are you bringing with you?"
        registration={register("groupSize", {
          min: { value: 1, message: "You must come with at least one person" },
        })}
        error={errors.groupSize?.message}
      />
    </>
  );
};
