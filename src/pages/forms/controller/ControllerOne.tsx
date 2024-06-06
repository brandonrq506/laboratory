import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/core";
import { ComboBox } from "@/components/form";
import { DevTool } from "@hookform/devtools";
import { Option } from "@/types/core";

type FormValues = {
  food: Option | null;
};

export const ControllerOne = () => {
  const { control, handleSubmit, resetField, setFocus } = useForm<FormValues>({
    defaultValues: {
      food: null,
    },
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
        <Controller
          name="food"
          control={control}
          render={({ field, fieldState }) => (
            <ComboBox
              label="Favorite Food"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              name={field.name}
              ref={field.ref}
              error={fieldState.error?.message}
              options={[
                { value: 1, label: "Pizza" },
                { value: 2, label: "Burger" },
                { value: 3, label: "Sushi" },
              ]}
            />
          )}
          rules={{
            required: "We REALLY need to know this piece of information",
          }}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>

        <hr className="my-3" />
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setFocus("food")}>
            Focus
          </Button>
          <Button variant="danger" onClick={() => resetField("food")}>
            Reset
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
