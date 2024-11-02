import { useState } from "react";

import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

/* The idea is to be able to easily create a ComboBox component with the options looking the way we need it.
   We should have a base ComboBox component, the same way we have a Modal component.
   And then it should be extended with the options we want to display, how and when to display them.
   
   i am thinking having a <CustomComboBox> that looks more or less like this:
   
   export const CustomeComboBox = ({value, onChange}) => {
     const [query, setQuery] = useState("");
     const [selectedPerson, setSelectedPerson] = useState(null);
   
     return (
       <ComboBox value={value} onChange={onChange}>
         <Label showAsterisk>Label</Label>
         <Input onChange={setQuery} displayValue='property' /> //displayValue={(p) => p.[property]}
         <ComboBox.Options>
           {({open, selected}) => (
             //Defining the options here as you'd like.
           )}
         </ComboBox.Options>
         <ComboBox.Description>description</ComboBox.Description>
         <ComboBox.Error>error</ComboBox.Error>
       </ComboBox>
     );
   };
    */

/* const people = [
     { id: 1, name: "Leslie Alexander" },
     { id: 2, name: "Brandon Alexander" },
     { id: 3, name: "Hillary Alexander" },
     { id: 4, name: "Roberto Alexander" },
     { id: 5, name: "Alex Alexander" },
     { id: 6, name: "Jason Alexander" },
     { id: 7, name: "Villeda Alexander" },
     { id: 8, name: "Monge Alexander" },
   ]; */

type ComboBoxProps = {
  label: string;
  showAsterisk?: boolean;
};

export const ComboBoxV2 = ({ label, showAsterisk }: ComboBoxProps) => {
  // const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  /* const filteredPeople =
       query === ""
         ? people
         : people.filter((person) => {
             return person.name.toLowerCase().includes(query.toLowerCase());
           }); */

  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={setSelectedPerson}
      nullable>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {showAsterisk && <span className="ml-1 text-red-700">*</span>}
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Button className="flex w-full items-center">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            /* onChange={(event) => setQuery(event.target.value)}
               displayValue={(person) => person?.name} */
            autoComplete="off"
          />
          <ChevronUpDownIcon
            className="-ml-6 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {/* {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }>
                {({ active, selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        selected && "font-semibold",
                      )}>
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600",
                        )}>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )} */}
      </div>
    </Combobox>
  );
};
