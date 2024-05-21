import { FavoritesInfo, PersonalInfo } from "./components";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/core";
import { FormValues } from "./types";

export const ProviderForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      favFood: null,
      favColor: null,
      groupSize: 1,
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-3/4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PersonalInfo />
          <hr className="my-3" />
          <FavoritesInfo />
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </form>
      </FormProvider>
      <DevTool control={methods.control} />
    </div>
  );
};
