import { Draw } from "@/types/canvas";
import { RefObject } from "react";

export const drawLine = ({
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

export const clearCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
