import useCanvas from "@/hooks/useCanvas";
import useDraw from "@/hooks/useDraw";
import useTools from "@/hooks/useTools";
import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";
import { DrawLine } from "@/types/canvas";
import { drawLine } from "@/utils/canvas";
import { useRef } from "react";
import CanvasTools from "./CanvasTools";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roomId = useRoomId();
  const socket = useSocket();
  const { onMouseDown } = useDraw({ onDraw: handleDraw, canvasRef });
  useCanvas({ canvasRef });
  const tools = useTools();
  const { tool, color, brushSize } = tools;

  function handleDraw({ ctx, currentPoint, prevPoint }: DrawLine) {
    if (!tool) return;
    socket.emit("draw-line", {
      prevPoint,
      currentPoint,
      roomId,
      tool,
      color,
      brushSize,
    });
    drawLine({ ctx, prevPoint, currentPoint, tool, color, brushSize });
  }

  return (
    <section className="bg-navy-800 w-[1000px] h-[600px] flex justify-between">
      <CanvasTools tools={tools} />
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={800}
        height={600}
        className="border bg-white"
      />
    </section>
  );
}
