import { useCategories } from "@/features/categories/api/tanstack/useCategories";

import { Color } from "@/features/colors/types/color";
import { EditCategoryForm } from "@/features/categories/components";
import { Fragment } from "react";
import { clsx } from "clsx";
import { getColorByName } from "@/features/colors/utils/getColorByName";

// TODO: Extract to a separate file
const DummyActivity = ({ color }: { color: Color }) => {
  return (
    <div
      className={clsx(
        "rounded-md border px-3 py-2",
        color.bgClass,
        color.textClass,
        color.borderClass,
      )}>
      <div className="flex flex-col">
        <p>Basketball</p>
        <div className="flex gap-2 tracking-wide">
          <p className="text-xs text-opacity-80">Avg: 60m</p>
          <p className="text-xs text-opacity-80">Max: 120m</p>
        </div>
      </div>
    </div>
  );
};

// TODO: Extract to a separate file
const DummyTask = ({ color }: { color: Color }) => {
  return (
    <div
      className={clsx(
        "rounded-md border px-3 py-2",
        color.bgClass,
        color.textClass,
        color.borderClass,
      )}>
      <div className="flex flex-col">
        <p>Basketball</p>
        <div className="flex gap-2 tracking-wide">
          <p className="text-xs text-opacity-80">Started: 15:24</p>
          <p className="text-xs text-opacity-80">Ended: 16:43</p>
          <p className="text-xs text-opacity-80">(01h:19m)</p>
        </div>
      </div>
    </div>
  );
};

export const CategorySettingsPage = () => {
  const { data, isSuccess } = useCategories();

  return (
    <div>
      <h1>Category Settings</h1>
      {isSuccess &&
        data.map((category) => {
          const colorObject = getColorByName(category.color);

          return (
            <Fragment key={category.id}>
              <EditCategoryForm
                categoryId={category.id}
                initialValues={{
                  name: category.name,
                  color: { value: colorObject.id, label: colorObject.name },
                }}
              />
              <div className="mt-2 flex flex-col gap-2">
                <DummyActivity color={colorObject} />
                <DummyTask color={colorObject} />
              </div>
            </Fragment>
          );
        })}
    </div>
  );
};
