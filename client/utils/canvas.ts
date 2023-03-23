import { Draw, Shape } from "@/types/canvas";

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
  const storkColor = tool === "eraser" ? "#ffffff" : color;

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
  isShapeFill,
}: Draw) => {
  if (!ctx || !prevPoint) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";

  switch (tool as Shape) {
    case "square":
      if (isShapeFill) {
        ctx.fillRect(
          prevPoint.x,
          prevPoint.y,
          currentPoint.x - prevPoint.x,
          currentPoint.y - prevPoint.y
        );
        return;
      }
      ctx.strokeRect(
        prevPoint.x,
        prevPoint.y,
        currentPoint.x - prevPoint.x,
        currentPoint.y - prevPoint.y
      );
      break;
    case "circle":
      ctx.beginPath();
      const radius = Math.sqrt(
        Math.pow(prevPoint.x - currentPoint.x, 2) +
          Math.pow(prevPoint.y - currentPoint.y, 2)
      );
      ctx.arc(prevPoint.x, prevPoint.y, radius, 0, 2 * Math.PI);
      isShapeFill ? ctx.fill() : ctx.stroke();
      break;
    case "straight":
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
      break;
  }
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
