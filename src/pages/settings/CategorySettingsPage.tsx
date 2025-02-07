import { useCategories } from "@/features/categories/api/tanstack/useCategories";

import {
  CategoryBadge,
  NewCategoryButton,
} from "@/features/categories/components";
import { Outlet } from "react-router";
import { PageHeaderWithActions } from "@/components/layout";

export const CategorySettingsPage = () => {
  const { data, isSuccess } = useCategories();

  return (
    <div>
      <PageHeaderWithActions
        title="Category Settings"
        className="mb-2"
        actions={<NewCategoryButton />}
      />

      <div className="flex flex-wrap items-center gap-2">
        {isSuccess &&
          data.map((category) => {
            return (
              <div key={category.id}>
                <CategoryBadge category={category} />
              </div>
            );
          })}
      </div>

      <Outlet />
    </div>
  );
};
