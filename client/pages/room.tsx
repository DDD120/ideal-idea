import Canvas from "@/components/Canvas";
import Panel from "@/components/Panel";
import { RoomProvider } from "@/store/room";

export default function Room() {
  return (
    <RoomProvider>
      <div className="flex">
        <Canvas />
        <Panel />
      </div>
    </RoomProvider>
  );
}
