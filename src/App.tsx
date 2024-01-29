import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/components/layout";
import { Activities } from "@/pages/Activities";
import { Projects } from "@/pages/Projects";
import { TestingModal } from "@/pages/TestingModal";
import { FormsPage, NewLocation } from "@/pages/forms";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
