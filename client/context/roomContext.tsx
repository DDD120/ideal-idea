import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:4000");

interface RoomContextActions {
  onBlur: () => void;
  onFocus: () => void;
}

interface RoomContextValue {
  roomId: string | string[] | undefined;
  socket: Socket;
  isMsgActive: boolean;
  actions: RoomContextActions;
}

interface Props {
  children: React.ReactNode;
}

const RoomContext = createContext<RoomContextValue | null>(null);

export function RoomProvider({ children }: Props) {
  const [isMsgActive, setIsMsgActive] = useState(false);
  const router = useRouter();
  const roomId = router.query.c;

  const actions = useMemo(
    () => ({
      onBlur: () => setIsMsgActive(false),
      onFocus: () => setIsMsgActive(true),
    }),
    [isMsgActive]
  );

  const value = useMemo(
    () => ({ roomId, socket, actions, isMsgActive }),
    [roomId, socket, actions, isMsgActive]
  );

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

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoomContext() {
  const room = useContext(RoomContext);
  if (!room) {
    throw new Error("useRoomContext should be used within RoomProvider");
  }

  return room;
}
