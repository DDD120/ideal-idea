import Meta from "@/components/Meta";
import Canvas from "@/components/room/Canvas";
import Panel from "@/components/room/Panel";
import { RoomProvider } from "@/context/roomContext";

export default function Room() {
  return (
    <>
      <Meta description="ideal idea에 당신을 초대합니다" />
      <RoomProvider>
        <div className="min-w-[1288px] min-h-[600px] h-full flex justify-center items-center">
          <Canvas />
          <Panel />
        </div>
      </RoomProvider>
    </>
  );
}
