import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Derived } from "@/pages";
import { MainLayout } from "@/components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/derived-state",
        element: <Derived />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
