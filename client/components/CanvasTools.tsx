import { useRoom } from "@/store/room";
import { ReturnTools } from "@/types/canvas";
import { ChangeEvent, RefObject, useState } from "react";
import Square from "@/public/svg/square.svg";
import Circle from "@/public/svg/circle.svg";
import Straight from "@/public/svg/straight.svg";
import Pen from "@/public/svg/pen.svg";
import Eraser from "@/public/svg/eraser.svg";
import ImageDownload from "./ImageDownload";

interface Props {
  tools: ReturnTools;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function CanvasTools({
  tools: {
    tool,
    color,
    brushSize,
    isShapeFill,
    onShapeFillChange,
    onToolChange,
  },
  canvasRef,
}: Props) {
  const [isShowDownload, setIsShowDownload] = useState(false);
  const { roomId, socket } = useRoom();

  const handleToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    onToolChange("tool", e.target.value);
  };

  const handleDownloadClose = () => {
    setIsShowDownload(false);
  };

  return (
    <div className="w-[200px] p-3">
      <fieldset>
        <h2>도형</h2>

        <input
          type="radio"
          id="square"
          name="tools"
          value="square"
          onChange={handleToolChange}
          className="hidden"
        />
        <label
          htmlFor="square"
          className="cursor-pointer p-1 flex items-center gap-3 my-2"
        >
          <Square
            width="24"
            height="24"
            fill={tool === "square" ? "#f76597" : "white"}
          />
          <p className={tool === "square" ? "text-pink" : "text-white"}>
            사각형
          </p>
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
          <Circle
            width="24"
            height="24"
            fill={tool === "circle" ? "#f76597" : "white"}
          />
          <p className={tool === "circle" ? "text-pink" : "text-white"}>원</p>
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
          <Straight
            width="24"
            height="24"
            fill={tool === "straight" ? "#f76597" : "white"}
            transform="rotate(45)"
          />
          <p className={tool === "straight" ? "text-pink" : "text-white"}>
            직선
          </p>
        </label>
        <input
          type="checkbox"
          id="shape-fill"
          value="shape-fill"
          defaultChecked={isShapeFill}
          onChange={(e) => onShapeFillChange(e.target.checked)}
          className="cursor-pointer accent-pink ml-2"
        />
        <label htmlFor="shape-fill" className="ml-2 cursor-pointer">
          채우기
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
          <p className={tool === "pen" ? "text-pink" : "text-white"}>펜</p>
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
          <p className={tool === "eraser" ? "text-pink" : "text-white"}>
            지우개
          </p>
        </label>
      </fieldset>
      <h2 className="my-1">크기</h2>
      <input
        type="range"
        min={1}
        max={50}
        onChange={(e) => onToolChange("brush", e.target.value)}
        value={brushSize}
        className="bg-pink w-full"
      />
      <h2 className="my-1">색상</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => onToolChange("color", e.target.value)}
      />
      <button
        className="w-full bg-navy-700 rounded-sm p-2 mt-2 hover:brightness-95"
        type="button"
        onClick={() => setIsShowDownload(true)}
      >
        이미지 저장
      </button>
      <button
        className="w-full bg-navy-700 rounded-sm p-2 mt-2 hover:brightness-95"
        type="button"
        onClick={() => socket.emit("canvas-clear", roomId)}
      >
        전체 지우기
      </button>
      <ImageDownload
        isOpen={isShowDownload}
        onRequestClose={handleDownloadClose}
        onClose={handleDownloadClose}
        canvasURL={canvasRef.current?.toDataURL()}
      />
    </div>
  );
}
