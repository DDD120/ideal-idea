import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";
import { ReturnTools } from "@/types/canvas";
import { ChangeEvent } from "react";

interface Props {
  tools: ReturnTools;
}

export default function CanvasTools({
  tools: { color, brushSize, onToolsChange },
}: Props) {
  const socket = useSocket();
  const roomId = useRoomId();

  const handleToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    onToolsChange("tool", e.target.value);
  };

  return (
    <div>
      <fieldset>
        <legend>도구</legend>
        <input
          type="radio"
          id="pen"
          name="tools"
          value="pen"
          onChange={handleToolChange}
        />
        <label htmlFor="pen">연필</label>
        <input
          type="radio"
          id="eraser"
          name="tools"
          value="eraser"
          onChange={handleToolChange}
        />
        <label htmlFor="eraser">지우개</label>
      </fieldset>
      <input
        type="range"
        min={1}
        max={50}
        onChange={(e) => onToolsChange("brush", e.target.value)}
        value={brushSize}
      />
      <input
        type="color"
        color={color}
        onChange={(e) => onToolsChange("color", e.target.value)}
      />
      <button type="button" onClick={() => socket.emit("canvas-clear", roomId)}>
        전체 지우기
      </button>
    </div>
  );
}
