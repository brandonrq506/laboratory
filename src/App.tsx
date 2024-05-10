import {
  FormsPage,
  NewLocation,
  LastName,
  DynamicPassword,
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
        path: "form-projects/shouldunregister-2",
        element: <DynamicPassword />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
