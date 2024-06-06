import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { ControlledComboBox } from "./ControlledComboBox";
import { DevTool } from "@hookform/devtools";
import { Option } from "@/types/core";

const PizzasAPI: Option[] = [
  { value: 1, label: "Pizza" },
  { value: 2, label: "Burger" },
  { value: 3, label: "Sushi" },
];

const PlanetsAPI: Option[] = [
  { value: 1, label: "Earth" },
  { value: 2, label: "Mars" },
  { value: 3, label: "Venus" },
];

type FormValues = {
  food: Option | null;
  planet: Option | null;
};

export const ControllerTwo = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      food: null,
      planet: null,
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledComboBox
          control={control}
          name="food"
          showAsterisk
          options={PizzasAPI}
          label="Favorite Food"
          rules={{ required: "I NEED to know your favorite food" }}
          description="We'll use this information to plan out Team Building!"
        />
        <br />
        <ControlledComboBox
          control={control}
          name="planet"
          showAsterisk
          options={PlanetsAPI}
          label="Favorite Planet"
          rules={{ required: "Are you annoyed that Uranus is not an option?" }}
          description="This helps up plan the Trivia games"
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
