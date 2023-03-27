import { User } from "./../utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRoomContext } from "@/context/roomContext";

export default function useUsers() {
  const { roomId, socket } = useRoomContext();
  const [users, setUsers] = useState<User[]>([]);
  const [me, setMe] = useState<User>({ id: socket.id, nickname: "토끼" });
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    router.replace(
      {
        pathname: "/room",
        query: {
          c: roomId,
        },
      },
      "/room"
    );
    socket.emit("join-room", roomId, (me: User) => {
      setMe(me);
    });

    socket.on("full-room", () => {
      router.push("/");
      window.alert("정원 초과한 방입니다.");
    });

    socket.on("set-users", (users: User[]) => {
      setUsers(users);
    });

    return () => {
      socket.off("join-room");
      socket.off("full-room");
      socket.off("set-users");
    };
  }, [socket, router.isReady]);

  return {
    users,
    me,
    roomId,
  };
}
