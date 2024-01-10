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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
