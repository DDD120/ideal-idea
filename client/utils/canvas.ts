import { Draw } from "@/types/canvas";

export const computePoint = (canvas: HTMLCanvasElement, e: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};

export const drawCanvas = ({
  ctx,
  prevPoint,
  currentPoint,
  tool,
  color,
  brushSize,
}: Draw) => {
  if (!ctx) return;
  const { x: currX, y: currY } = currentPoint;
  const storkColor = tool === "pen" ? color : "#ffffff";

  const startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = storkColor;
  ctx.lineCap = "round";
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
