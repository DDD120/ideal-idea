import { Draw } from "@/types/canvas";

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
