import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";
import { useEffect } from "react";

export default function useCanvas() {
  const roomId = useRoomId();
  const socket = useSocket();
}
