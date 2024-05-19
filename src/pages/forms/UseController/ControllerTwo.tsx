import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/core";
import { Option } from "@/types/core";
import { ControlledComboBox } from "./ControlledComboBox";

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
          label="Favorite Food"
          options={PizzasAPI}
          rules={{ required: "I NEED to know your favorite food" }}
        />

        <ControlledComboBox
          control={control}
          name="planet"
          label="Favorite Planet"
          options={PlanetsAPI}
          rules={{ required: "Are you annoyed that Uranus is not an option?" }}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
