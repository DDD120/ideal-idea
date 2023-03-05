import useDraw from "@/hooks/useDraw";
import { Draw } from "@/types/canvas";
import { useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onMouseDown } = useDraw({ onDraw: handleDraw, canvasRef });

  function handleDraw({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    const startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }

  return (
    <section className="bg-navy-800 w-[1000px] h-[600px] flex justify-between">
      <div></div>
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
