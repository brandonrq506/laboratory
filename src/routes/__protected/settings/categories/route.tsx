import { useSuspenseQuery } from "@tanstack/react-query";

import {
  CategoryBadge,
  NewCategoryButton,
} from "@/features/categories/components";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { PageHeaderWithActions } from "@/components/layout";
import { categoryListQueryOptions } from "@/features/categories/api/queries";

export const Route = createFileRoute("/__protected/settings/categories")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(categoryListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(categoryListQueryOptions());

  return (
    <div>
      <PageHeaderWithActions
        title="Category Settings"
        className="mb-2"
        actions={<NewCategoryButton />}
      />

      <div className="flex flex-wrap items-center gap-2">
        {data.map((category) => {
          return (
            <Link
              from="/settings/categories"
              to="$categoryId/edit"
              params={{ categoryId: String(category.id) }}
              key={category.id}>
              <CategoryBadge category={category} />
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}
