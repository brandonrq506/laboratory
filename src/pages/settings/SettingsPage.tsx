import { NavLink, Outlet } from "react-router-dom";
import { Card } from "@/components/layout";
import { clsx } from "clsx";

const settingsPages = [
  { name: "Account", href: "account" },
  { name: "Categories", href: "categories" },
  { name: "Notifications", href: "notifications" },
];

export const SettingsPage = () => {
  return (
    <Card className="h-full">
      <header>
        <nav>
          <ul role="list" aria-label="Tabs" className="flex space-x-4">
            {settingsPages.map((page) => (
              <li key={page.href}>
                <NavLink
                  to={page.href}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
                      "rounded-md px-3 py-2 text-sm font-medium",
                    )
                  }>
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <br />
      <Outlet />
    </Card>
  );
};
