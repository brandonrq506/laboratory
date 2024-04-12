import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, UseEffectOne, ChatRoom, ChatRoomTwo, Interval } from "@/pages";
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
        path: "/use-effect-one",
        element: <UseEffectOne />,
      },
      {
        path: "/chat-room",
        element: <ChatRoom />,
      },
      {
        path: "/chat-room-two",
        element: <ChatRoomTwo />,
      },
      {
        path: "/challenge/interval",
        element: <Interval />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
