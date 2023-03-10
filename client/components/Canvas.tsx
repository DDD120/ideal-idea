import useCanvas from "@/hooks/useCanvas";
import useMouse from "@/hooks/useMouse";
import useTools from "@/hooks/useTools";
import { useRoom } from "@/store/room";
import { DrawLine } from "@/types/canvas";
import { drawCanvas } from "@/utils/canvas";
import { useRef } from "react";
import CanvasTools from "./CanvasTools";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { roomId, socket } = useRoom();
  useMouse({ onDraw: handleDraw, canvasRef });
  useCanvas({ canvasRef });
  const tools = useTools();
  const { tool, color, brushSize } = tools;

  function handleDraw({ ctx, currentPoint, prevPoint }: DrawLine) {
    if (!tool) return;
    socket.emit("canvas-draw", {
      prevPoint,
      currentPoint,
      roomId,
      tool,
      color,
      brushSize,
    });
    drawCanvas({ ctx, prevPoint, currentPoint, tool, color, brushSize });
  }

  return (
    <section className="bg-navy-800 w-[1000px] h-[600px] flex justify-between">
      <CanvasTools tools={tools} />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border bg-white"
      />
    </section>
  );
}
