import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const RoomContext = createContext<string | string[] | undefined>(undefined);

export function RoomProvider({ children }: Props) {
  const router = useRouter();
  const roomId = router.query.c;

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.c) {
        router.push("/");
      }
    }

    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, [router.isReady]);

  return <RoomContext.Provider value={roomId}>{children}</RoomContext.Provider>;
}

export function useRoomId() {
  const roomId = useContext(RoomContext);
  return roomId;
}
