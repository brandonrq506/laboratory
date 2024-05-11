import {
  FormsPage,
  NewLocation,
  LastName,
  DynamicPassword,
  Unregister,
} from "@/pages/forms";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { Activities } from "@/pages/Activities";
import { Projects } from "@/pages/Projects";
import { TestingModal } from "@/pages/TestingModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "modal-testing",
        element: <TestingModal />,
      },
      {
        path: "form-projects",
        element: <FormsPage />,
      },
      {
        path: "form-projects/new-location",
        element: <NewLocation />,
      },
      {
        path: "form-projects/shouldunregister-1",
        element: <LastName />,
      },
      {
        path: "form-projects/deps-1",
        element: <DynamicPassword />,
      },
      {
        path: "form-projects/unregister",
        element: <Unregister />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
