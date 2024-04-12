import { useEffect } from "react";
import { createConnection } from "@/utils";

export const ChatRoom = () => {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
  }, []);

  return (
    <div className="mt-16 text-center text-3xl">
      Bienvenidos a la sala de Chat
    </div>
  );
};
