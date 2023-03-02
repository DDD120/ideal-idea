import { User } from "./../types/room";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSocket } from "@/store/socket";

export default function useRoom(roomId: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [me, setMe] = useState<User>({ id: "", nickname: "" });
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
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
  }, [socket]);

  return {
    users,
    me,
    roomId,
  };
}
