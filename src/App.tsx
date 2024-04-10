import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/components/layout";
import { WhyReactRerendersOne, WhyReactRerendersTwo } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "why-react-rerenders-one",
        element: <WhyReactRerendersOne />,
      },
      {
        path: "why-react-rerenders-two",
        element: <WhyReactRerendersTwo />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
