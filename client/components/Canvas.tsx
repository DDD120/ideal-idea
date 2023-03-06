import useCanvas from "@/hooks/useCanvas";
import useDraw from "@/hooks/useDraw";
import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";
import { Draw } from "@/types/canvas";
import { drawLine } from "@/utils/canvas";
import { useRef } from "react";
import Tools from "./Tools";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roomId = useRoomId();
  const socket = useSocket();
  const { onMouseDown } = useDraw({ onDraw: handleDraw, canvasRef });
  useCanvas({ canvasRef });

  function handleDraw({ ctx, currentPoint, prevPoint }: Draw) {
    socket.emit("draw-line", {
      prevPoint,
      currentPoint,
      roomId,
    });
    drawLine({ ctx, prevPoint, currentPoint });
  }

  return (
    <section className="bg-navy-800 w-[1000px] h-[600px] flex justify-between">
      <Tools />
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
