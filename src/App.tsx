import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/components/layout";
import { Activities } from "@/pages/Activities";
import { Projects } from "@/pages/Projects";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
