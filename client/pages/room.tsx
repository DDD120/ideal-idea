import Panel from "@/components/Panel";
import { RoomProvider } from "@/store/room";

export default function Room() {
  return (
    <RoomProvider>
      <Panel />
    </RoomProvider>
  );
}
