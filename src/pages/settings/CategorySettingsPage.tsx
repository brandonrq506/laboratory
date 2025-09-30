import { useQuery } from "@tanstack/react-query";

import {
  CategoryBadge,
  NewCategoryButton,
} from "@/features/categories/components";
import { Link, Outlet } from "react-router";
import { PageHeaderWithActions } from "@/components/layout";
import { categoryListQueryOptions } from "@/features/categories/api/queries";

export const CategorySettingsPage = () => {
  const { data, isSuccess } = useQuery(categoryListQueryOptions());

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
              <Link to={`edit/${category.id}`} key={category.id}>
                <CategoryBadge category={category} />
              </Link>
            );
          })}
      </div>

      <Outlet />
    </div>
  );
};
