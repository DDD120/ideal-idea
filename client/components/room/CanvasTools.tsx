import { useRoomContext } from "@/context/roomContext";
import { ReturnTools, Tool } from "@/utils/types";
import { RefObject, useState } from "react";
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
    onColorChange,
    onBrushSizeChange,
    onToolChange,
  },
  canvasRef,
}: Props) {
  const [isShowDownload, setIsShowDownload] = useState(false);
  const { roomId, socket } = useRoomContext();

  const handleDownloadClose = () => {
    setIsShowDownload(false);
  };

  return (
    <section className="w-[200px] p-3">
      <fieldset>
        <h2>도형</h2>
        <InputTool
          currentTool={tool}
          tool="square"
          onChange={(e) => onToolChange(e.target.value as Tool)}
          shortcut="r"
        >
          사각형
        </InputTool>
        <InputTool
          currentTool={tool}
          tool="circle"
          onChange={(e) => onToolChange(e.target.value as Tool)}
          shortcut="c"
        >
          원
        </InputTool>
        <InputTool
          currentTool={tool}
          tool="straight"
          onChange={(e) => onToolChange(e.target.value as Tool)}
          shortcut="s"
        >
          직선
        </InputTool>
        <input
          type="checkbox"
          id="shape-fill"
          value="shape-fill"
          checked={isShapeFill}
          onChange={(e) => onShapeFillChange(e.target.checked)}
          className="cursor-pointer accent-pink ml-2"
        />
        <label htmlFor="shape-fill" className="ml-2 cursor-pointer" title="f">
          채우기
        </label>
        <h2 className="my-1">도구</h2>
        <InputTool
          currentTool={tool}
          tool="pen"
          onChange={(e) => onToolChange(e.target.value as Tool)}
          shortcut="p"
        >
          펜
        </InputTool>
        <InputTool
          currentTool={tool}
          tool="eraser"
          onChange={(e) => onToolChange(e.target.value as Tool)}
          shortcut="e"
        >
          지우개
        </InputTool>
        <InputTool
          currentTool={tool}
          tool="marker"
          onChange={(e) => onToolChange(e.target.value as Tool)}
          shortcut="m"
        >
          마커
        </InputTool>
      </fieldset>
      <h2 className="my-1">크기 {brushSize}</h2>
      <input
        type="range"
        min={1}
        max={50}
        onChange={(e) => onBrushSizeChange(e.target.value)}
        value={brushSize}
        className="bg-pink w-full"
        title="'[' / ']'"
      />
      <h2 className="my-1">색상</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
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
