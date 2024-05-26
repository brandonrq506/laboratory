import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types/FormValues";
import { FleetCustomer } from "./components";
import { Footer } from "./layout";

export const OnboardingForm = () => {
  const methods = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="flex h-full flex-col">
      <FormProvider {...methods}>
        <div className="flex flex-1 justify-center pt-4">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="h-full w-full md:w-2/3">
            <FleetCustomer />
          </form>
        </div>
        <Footer />
      </FormProvider>
    </div>
  );
};
