import Canvas from "@/components/Canvas";
import Panel from "@/components/Panel";
import { RoomProvider } from "@/store/room";

export default function Room() {
  return (
    <>
      <RoomProvider>
        <div className="min-w-[1288px] min-h-[600px] h-full flex justify-center items-center">
          <Canvas />
          <Panel />
        </div>
      </RoomProvider>
    </>
  );
}
