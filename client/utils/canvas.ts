import { Draw } from "@/types/canvas";

export const computePoint = (canvas: HTMLCanvasElement, e: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};

export const drawLine = ({
  ctx,
  prevPoint,
  currentPoint,
  tool,
  color,
  brushSize,
}: Draw) => {
  if (!ctx) return;
  const storkColor = tool === "pen" ? color : "#ffffff";

  const startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = storkColor;
  ctx.lineCap = "round";
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentPoint.x, currentPoint.y);
  ctx.stroke();
};

export const drawShape = ({
  ctx,
  prevPoint,
  currentPoint,
  tool,
  color,
  brushSize,
}) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = color;
  ctx.strokeRect(
    prevPoint.x,
    prevPoint.y,
    currentPoint.x - prevPoint.x,
    currentPoint.y - prevPoint.y
  );
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
