import {
  Link,
  Outlet,
  createFileRoute,
  linkOptions,
} from "@tanstack/react-router";
import { Card } from "@/components/layout";
import clsx from "clsx";

const settingsTabs = linkOptions([
  { label: "Account", to: "/settings/account" },
  { label: "Categories", to: "/settings/categories" },
  { label: "Notifications", to: "/settings/notifications" },
]);

const baseClass = "rounded-md px-3 py-2 text-sm font-medium";
const activeClass = "bg-indigo-100 text-indigo-700";
const inactiveClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-700";

export const Route = createFileRoute("/__protected/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="h-full">
      <header>
        <nav>
          <ul role="list" aria-label="Tabs" className="flex space-x-4">
            {settingsTabs.map((tab) => (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  activeProps={{ className: clsx(baseClass, activeClass) }}
                  inactiveProps={{ className: clsx(baseClass, inactiveClass) }}>
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <br />
      <Outlet />
    </Card>
  );
}
