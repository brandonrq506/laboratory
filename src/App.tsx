import {
  Home,
  Derived,
  Contradictions,
  Duplication,
  Accordion,
  Scoreboard,
} from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
      {
        path: "/share-state",
        element: <Accordion />,
      },
      {
        path: "/what-rerenders",
        element: <Scoreboard />,
      }
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
