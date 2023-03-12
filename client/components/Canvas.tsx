import useCanvas from "@/hooks/useCanvas";
import useMouse from "@/hooks/useMouse";
import useTools from "@/hooks/useTools";
import { useRoom } from "@/store/room";
import { DrawLine } from "@/types/canvas";
import { drawLine, drawShape } from "@/utils/canvas";
import { useRef } from "react";
import CanvasTools from "./CanvasTools";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasTempRef = useRef<HTMLCanvasElement>(null);
  const { roomId, socket } = useRoom();
  useMouse({
    onDrawLine: handleDrawLine,
    onDrawShape: handleDrawShape,
    canvasRef,
    canvasTempRef,
  });
  useCanvas({ canvasRef });
  const tools = useTools();
  const { tool, color, brushSize, isShapeTool, isShapeFill } = tools;

  function handleDrawLine({ ctx, currentPoint, prevPoint }: DrawLine) {
    if (!tool) return;
    socket.emit("canvas-draw", {
      prevPoint,
      currentPoint,
      roomId,
      tool,
      color,
      brushSize,
    });
    drawLine({
      ctx,
      prevPoint,
      currentPoint,
      tool,
      color,
      brushSize,
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
    <section className="bg-navy-800 w-[1000px] h-[600px] flex justify-between">
      <CanvasTools tools={tools} />
      <div className="relative w-[800px] bg-white">
        <canvas
          ref={canvasTempRef}
          width={800}
          height={600}
          className={`absolute ${isShapeTool ? "z-10" : undefined}`}
        />
        <canvas ref={canvasRef} width={800} height={600} className="absolute" />
      </div>
    </section>
  );
}
