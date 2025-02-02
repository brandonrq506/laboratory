import { useCategories } from "@/features/categories/api/tanstack/useCategories";

import {
  EditCategoryForm,
  NewCategoryButton,
} from "@/features/categories/components";
import { Fragment } from "react";
import { Outlet } from "react-router";
import { PageHeaderWithActions } from "@/components/layout";

import { Color } from "@/features/colors/types/color";
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
          <p className="text-opacity-80 text-xs">Avg: 60m</p>
          <p className="text-opacity-80 text-xs">Max: 120m</p>
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
          <p className="text-opacity-80 text-xs">Started: 15:24</p>
          <p className="text-opacity-80 text-xs">Ended: 16:43</p>
          <p className="text-opacity-80 text-xs">(01h:19m)</p>
        </div>
      </div>
    </div>
  );
};

export const CategorySettingsPage = () => {
  const { data, isSuccess } = useCategories();

  return (
    <div>
      <PageHeaderWithActions
        title="Category Settings"
        className="mb-2"
        actions={<NewCategoryButton />}
      />
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

      <Outlet />
    </div>
  );
};
