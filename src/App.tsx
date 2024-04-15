import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Online } from "@/pages";
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
        path: "/online-component",
        element: <Online />,
      }
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
