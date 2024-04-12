import {
  ChatRoom,
  ChatRoomTwo,
  Home,
  Interval,
  Synchronization,
  UseEffectOne,
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
      {
        path: "/challenge/synchronization",
        element: <Synchronization />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
