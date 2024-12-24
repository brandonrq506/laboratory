import { useForm } from "react-hook-form";
import { useTodos } from "../api/useTodos";

import { CategorySelect } from "@/features/categories/components";

export const TodoList = () => {
  const { data, isSuccess } = useTodos();
  const { control } = useForm({
    defaultValues: { categories: { value: 1, label: "Productive" } },
  });
  return (
    <div>
      <h1>{isSuccess && data.length}</h1>
      <form>
        <CategorySelect name="categories" control={control} />
      </form>
    </div>
  );
};
