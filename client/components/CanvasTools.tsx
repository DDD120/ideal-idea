import { useRoom } from "@/store/room";
import { ReturnTools } from "@/types/canvas";
import { ChangeEvent } from "react";
import Pen from "@/assets/svg/pen.svg";
import Eraser from "@/assets/svg/eraser.svg";

interface Props {
  tools: ReturnTools;
}

export default function CanvasTools({
  tools: { tool, color, brushSize, onToolsChange },
}: Props) {
  const { roomId, socket } = useRoom();

  const handleToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    onToolsChange("tool", e.target.value);
  };

  return (
    <div className="flex-1 p-3">
      <fieldset>
        <h2>도형</h2>

        <input
          type="radio"
          id="rectangle"
          name="tools"
          value="rectangle"
          onChange={handleToolChange}
          className="hidden"
        />
        <label
          htmlFor="rectangle"
          className="cursor-pointer p-1 flex items-center gap-3 my-2"
        >
          <p className={tool === "rectangle" ? "text-pink" : "white"}>사각형</p>
        </label>
        <input
          type="radio"
          id="circle"
          name="tools"
          value="circle"
          onChange={handleToolChange}
          className="hidden"
        />
        <label
          htmlFor="circle"
          className="cursor-pointer p-1 flex items-center gap-3 my-2"
        >
          <p className={tool === "circle" ? "text-pink" : "white"}>원</p>
        </label>
        <input
          type="radio"
          id="straight"
          name="tools"
          value="straight"
          onChange={handleToolChange}
          className="hidden"
        />
        <label
          htmlFor="straight"
          className="cursor-pointer p-1 flex items-center gap-3 my-2"
        >
          <p className={tool === "straight" ? "text-pink" : "white"}>직선</p>
        </label>
        <h2>도구</h2>
        <input
          type="radio"
          id="pen"
          name="tools"
          value="pen"
          onChange={handleToolChange}
          defaultChecked
          className="hidden"
        />
        <label
          htmlFor="pen"
          className="cursor-pointer p-1 flex items-center gap-3 my-2"
        >
          <Pen
            width="24"
            height="24"
            fill={tool === "pen" ? "#f76597" : "white"}
          />
          <p className={tool === "pen" ? "text-pink" : "white"}>펜</p>
        </label>
        <input
          type="radio"
          id="eraser"
          name="tools"
          value="eraser"
          onChange={handleToolChange}
          className="hidden"
        />
        <label
          htmlFor="eraser"
          className="cursor-pointer p-1 flex  items-center gap-3 my-2"
        >
          <Eraser
            width="24"
            height="24"
            fill={tool === "eraser" ? "#f76597" : "white"}
          />
          <p className={tool === "eraser" ? "text-pink" : "white"}>지우개</p>
        </label>
      </fieldset>
      <h2 className="my-1">크기</h2>
      <input
        type="range"
        min={1}
        max={50}
        onChange={(e) => onToolsChange("brush", e.target.value)}
        value={brushSize}
        className="bg-pink w-full"
      />
      <h2 className="my-1">색상</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => onToolsChange("color", e.target.value)}
      />
      <button
        className="w-full bg-navy-700 rounded-sm p-2 mt-2"
        type="button"
        onClick={() => socket.emit("canvas-clear", roomId)}
      >
        전체 지우기
      </button>
    </div>
  );
}
