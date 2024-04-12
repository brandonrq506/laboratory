import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, UseEffectOne, ChatRoom, ChatRoomTwo } from "@/pages";
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
      }
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
