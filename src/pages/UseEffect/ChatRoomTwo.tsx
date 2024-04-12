import { useEffect, useState } from "react";
import { advancedConnection } from "@/utils";

export const ChatRoomTwo = () => {
  const [room, setRoom] = useState("General");

  useEffect(() => {
    const connection = advancedConnection(room);
    connection.connect();

    return () => connection.disconnect();
  }, [room]);

  return (
    <div className="mt-16 text-center text-3xl">
      <select
        value={room}
        name="room"
        onChange={(e) => setRoom(e.target.value)}
        className="rounded-md border-gray-300 px-10">
        <option value="General">General</option>
        <option value="Music">Music</option>
        <option value="Funny">Funny</option>
      </select>

      <h2 className="text-xl mt-3">Welcome to the {room} room!</h2>
    </div>
  );
};
