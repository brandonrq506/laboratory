import { useForm } from "react-hook-form";
import { TextInput } from "@/components/form";
import { Button } from "@/components/core";
const URL = "https://jsonplaceholder.typicode.com/users/1";

type FormValues = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const AsyncFormState = () => {
  const { formState, handleSubmit, register } = useForm<FormValues>({
    defaultValues: async () => await fetch(URL).then((res) => res.json()),
  });
  const { isLoading } = formState;
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
        <TextInput label="Name" registration={register("name")} />
        <TextInput label="Username" registration={register("username")} />
        <TextInput
          label="Email"
          type="email"
          registration={register("email")}
        />
        <div className="flex gap-5">
          <TextInput label="Phone" registration={register("phone")} />
          <TextInput label="Website" registration={register("website")} />
        </div>

        <hr className="my-3" />
        <h2 className="text-2xl">Address</h2>
        <div className="flex gap-5">
          <TextInput label="Street" registration={register("address.street")} />
          <TextInput label="Suite" registration={register("address.suite")} />
          <TextInput label="City" registration={register("address.city")} />
          <TextInput
            label="Zipcode"
            registration={register("address.zipcode")}
          />
        </div>

        <hr className="my-3" />
        <h2 className="text-2xl">Company</h2>
        <TextInput label="Name" registration={register("company.name")} />
        <TextInput label="BS" registration={register("company.bs")} />
        <TextInput
          label="Catch Phrase"
          registration={register("company.catchPhrase")}
        />

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
    </>
  );
};
