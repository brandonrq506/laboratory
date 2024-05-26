import { useFormContext } from "react-hook-form";
import { FormValues } from "../types/FormValues";
import { TextInput } from "@/components/form";

export const FleetCustomer = () => {
  const { register } = useFormContext<FormValues>();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Fleet Customer</h1>
      <TextInput
        showAsterisk
        label="Fleet Customer Name"
        placeholder="Fleet Customer Name"
        registration={register("customerName", {
          required: "Fleet Customer Name is required",
        })}
      />
      <br />
      <TextInput
        label="Shopmonkey Customer ID"
        placeholder="66C2-BF1D-1A2B-4D3C-8E4F-5G6H"
        description="It's a 24-long digit you get from ShopMonkey. It is optional."
        registration={register("shopMonkeyId", {
          minLength: { value: 24, message: "ShopMonkey ID is 24-digit long" },
          maxLength: { value: 24, message: "ShopMonkey ID is 24-digit long" },
        })}
      />
      <br />
      <h2 className="text-1xl mb-4 text-center font-semibold">
        Main Point of Contact
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          showAsterisk
          label="First Name"
          placeholder="John"
          registration={register("pocFirstName", {
            required: "Point of Contact is required",
          })}
        />
        <TextInput
          showAsterisk
          label="Last Name"
          placeholder="Smith"
          registration={register("pocLastName", {
            required: "Point of Contact is required",
          })}
        />
        <TextInput
          showAsterisk
          label="Email"
          placeholder="john_smith@gmail.com"
          registration={register("pocEmail", {
            required: "Email is required",
          })}
        />
        <TextInput
          showAsterisk
          label="Phone Number"
          placeholder="123-456-7890"
          registration={register("pocPhone", {
            required: "Phone Number is required",
          })}
        />
      </div>
    </div>
  );
};
