import useCanvas from "@/hooks/useCanvas";
import useEvent from "@/hooks/useEvent";
import useTools from "@/hooks/useTools";
import { useRoomContext } from "@/context/roomContext";
import { DrawLine } from "@/utils/types";
import { drawLine, drawShape } from "@/utils/drawCanvas";
import { useRef } from "react";
import CanvasTools from "./CanvasTools";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasTempRef = useRef<HTMLCanvasElement>(null);
  const { roomId, socket } = useRoomContext();
  useEvent({
    onDrawLine: handleDrawLine,
    onDrawShape: handleDrawShape,
    canvasRef,
    canvasTempRef,
  });
  useCanvas({ canvasRef });
  const tools = useTools();
  const { tool, color, brushSize, isShapeTool, isShapeFill, isMarkerTool } =
    tools;

  function handleDrawLine({ ctx, currentPoint, prevPoint }: DrawLine) {
    socket.emit("canvas-draw", {
      prevPoint,
      currentPoint,
      roomId,
      tool,
      color,
      brushSize,
      isMarkerTool,
    });
    drawLine({
      ctx,
      prevPoint,
      currentPoint,
      tool,
      color,
      brushSize,
      isMarkerTool,
    });
  }

  function handleDrawShape({ ctx, currentPoint, prevPoint }: DrawLine) {
    drawShape({
      ctx,
      currentPoint,
      prevPoint,
      tool,
      color,
      brushSize,
      isShapeFill,
    });
  }

  return (
    <section className="bg-navy-800 h-[600px] flex">
      <CanvasTools tools={tools} canvasRef={canvasRef} />
      <div className="relative w-[800px] bg-white cursor-canvas">
        <canvas
          ref={canvasTempRef}
          width={800}
          height={600}
          className={`absolute ${isShapeTool ? "z-10" : ""}`}
        />
        <canvas ref={canvasRef} width={800} height={600} className="absolute" />
      </div>
    </section>
  );
}
