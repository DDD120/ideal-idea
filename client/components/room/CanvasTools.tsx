import { useRoom } from "@/store/room";
import { ReturnTools } from "@/utils/types";
import { ChangeEvent, RefObject, useState } from "react";
import Button from "./Button";
import ImageDownload from "./ImageDownload";
import InputTool from "./InputTool";

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
    <section className="w-[200px] p-3">
      <fieldset>
        <h2>도형</h2>
        <InputTool currentTool={tool} tool="square" onChange={handleToolChange}>
          사각형
        </InputTool>
        <InputTool currentTool={tool} tool="circle" onChange={handleToolChange}>
          원
        </InputTool>
        <InputTool
          currentTool={tool}
          tool="straight"
          onChange={handleToolChange}
        >
          직선
        </InputTool>
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
        <h2 className="my-1">도구</h2>
        <InputTool currentTool={tool} tool="pen" onChange={handleToolChange}>
          펜
        </InputTool>
        <InputTool currentTool={tool} tool="eraser" onChange={handleToolChange}>
          지우개
        </InputTool>
        <InputTool currentTool={tool} tool="marker" onChange={handleToolChange}>
          마커
        </InputTool>
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
      <Button bgColor="navy-700" onClick={() => setIsShowDownload(true)}>
        이미지 저장
      </Button>
      <Button
        bgColor="navy-700"
        onClick={() => socket.emit("canvas-clear", roomId)}
      >
        전체 지우기
      </Button>
      <ImageDownload
        isOpen={isShowDownload}
        onRequestClose={handleDownloadClose}
        onClose={handleDownloadClose}
        canvasURL={canvasRef.current?.toDataURL()}
      />
    </section>
  );
}
