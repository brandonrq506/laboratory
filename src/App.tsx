import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Online, Mouse, Counter } from "@/pages";
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
      },
      {
        path: "/mouse-component",
        element: <Mouse />,
      },
      {
        path: "/counter-component",
        element: <Counter />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
