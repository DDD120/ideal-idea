import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";

export default function Tools() {
  const socket = useSocket();
  const roomId = useRoomId();

  return (
    <div>
      <button type="button" onClick={() => socket.emit("canvas-clear", roomId)}>
        전체 지우기
      </button>
    </div>
  );
}
