import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:4000");

interface Room {
  roomId: string | string[] | undefined;
  socket: Socket;
}

interface Props {
  children: React.ReactNode;
}

const RoomContext = createContext<Room | null>(null);

export function RoomProvider({ children }: Props) {
  const router = useRouter();
  const roomId = router.query.c;

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.c) {
        window.alert("채널이 없는 방입니다.");
        router.push("/");
      }
    }

    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, [router.isReady]);

  return (
    <RoomContext.Provider value={{ roomId, socket }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const room = useContext(RoomContext);
  if (!room) {
    throw new Error("useRoom should be used within RoomProvider");
  }
  return room;
}
