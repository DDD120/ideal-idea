import { Draw } from "@/types/canvas";
import { RefObject } from "react";

export const drawLine = ({ ctx, prevPoint, currentPoint }: Draw) => {
  const { x: currX, y: currY } = currentPoint;

  const startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
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
