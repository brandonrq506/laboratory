import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/components/layout";
import {
  WhyReactRerendersOne,
  WhyReactRerendersTwo,
  ScrollBad,
  ScrollGood,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "why-rerenders-one",
        element: <WhyReactRerendersOne />,
      },
      {
        path: "why-rerenders-two",
        element: <WhyReactRerendersTwo />,
      },
      {
        path: "scroll-bad",
        element: <ScrollBad />,
      },
      {
        path: "scroll-good",
        element: <ScrollGood />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
