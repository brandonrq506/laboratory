import { useCategories } from "../api/tanstack/useCategories";
import { useSearchParams } from "react-router";

import { Select } from "@/components/form";

import { Option } from "@/types/core";
import { transformToOption } from "@/utils";

/*
TODO:
Update this to a RadioButton filter like the ones in TailwindUI.
We can choose to make filters single select, or multi-select with CheckBox later.
Using multi-select will come with complications, specially for date filters.
Although, we can either limit those to single select, or use a date-range picker.

Maybe we can abstract a custom useCategoryParams hook.
- Type-safe
- Handles not having anything selected (Returns -1)
*/

const defaultOptionValue = -1;
const defaultOption: Option = { value: defaultOptionValue, label: "All" };

export const CategorySelectFilter = () => {
  const { data, isPending, isError } = useCategories();
  const [params, setParams] = useSearchParams({
    category_id: "-1",
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const param = params.get("category_id");
  const categoryId = Number(param);

  const dataOptions = data.map((c) => transformToOption(c, "id", "name"));
  const options = [defaultOption, ...dataOptions];

  const selectedOption = options.find((o) => o.value === categoryId) ?? null;

  return (
    <Select
      name="category"
      label="Category"
      options={options}
      value={selectedOption}
      onBlur={() => {}}
      onChange={({ value }) => {
        setParams(
          (prev) => {
            if (value === defaultOptionValue) {
              prev.delete("category_id");
              return prev;
            }

            prev.set("category_id", value.toString());
            return prev;
          },
          { replace: true },
        );
      }}
    />
  );
};
