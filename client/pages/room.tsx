import { useSocket } from "@/store/socket";
import { useEffect } from "react";

export default function Room() {
  const socket = useSocket();

  useEffect(() => {
    socket.emit("join-room", "hi", (message: string) => {
      console.log(message);
    });

    return () => {
      socket.off("join-room");
    };
  }, [socket]);

  return (
    <div>
      <h1>ROOM</h1>
    </div>
  );
}
