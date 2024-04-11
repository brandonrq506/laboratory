import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Derived, Contradictions ,Duplication } from "@/pages";
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
      {
        path: "/derived-state-two",
        element: <Duplication />,
      },
      {
        path: "/structure-state",
        element: <Contradictions />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
