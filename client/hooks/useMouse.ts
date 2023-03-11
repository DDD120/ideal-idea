import { useRoom } from "@/store/room";
import { DrawLine, Point } from "@/types/canvas";
import { computePoint } from "@/utils/canvas";
import { RefObject, useEffect, useRef, useState } from "react";

interface Props {
  onDrawLine: (props: DrawLine) => void;
  onDrawShape: (props: DrawLine) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasTempRef: RefObject<HTMLCanvasElement>;
}

export default function useMouse({
  onDrawLine,
  onDrawShape,
  canvasRef,
  canvasTempRef,
}: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevPoint = useRef<Point | null>(null);
  const { socket, roomId } = useRoom();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasTemp = canvasTempRef.current;
    const ctx = canvas?.getContext("2d");
    const ctxTemp = canvasTemp?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx || !canvasTemp || !ctxTemp) return;

    const handleMousedown = () => {
      setIsMouseDown(true);
    };

    const handleMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvas, e);
      if (!currentPoint) return;

      onDrawLine({
        ctx,
        currentPoint,
        prevPoint: prevPoint.current,
      });
      prevPoint.current = currentPoint;
    };

    const handleMouseup = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
    };

    const handleTempMousedown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const currentPoint = computePoint(canvasTemp, e);
      if (!currentPoint) return;

      prevPoint.current = currentPoint;
    };

    const handleTempMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvasTemp, e);
      if (!currentPoint) return;

      onDrawShape({
        ctx: ctxTemp,
        currentPoint,
        prevPoint: prevPoint.current,
      });
    };

    const handleTempMouseup = async () => {
      setIsMouseDown(false);
      prevPoint.current = null;
      const canvas = canvasTemp.toDataURL();
      const img = new Image();
      img.src = canvas;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        socket.emit("canvas-state", { roomId, canvas });
        ctxTemp.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };
    };

    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mousemove", handleMousemove);
    canvas.addEventListener("mouseup", handleMouseup);
    canvasTemp.addEventListener("mousedown", handleTempMousedown);
    canvasTemp.addEventListener("mousemove", handleTempMousemove);
    canvasTemp.addEventListener("mouseup", handleTempMouseup);

    return () => {
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mousemove", handleMousemove);
      canvas.removeEventListener("mouseup", handleMouseup);
      canvasTemp.removeEventListener("mousedown", handleTempMousedown);
      canvasTemp.removeEventListener("mousemove", handleTempMousemove);
      canvasTemp.removeEventListener("mouseup", handleTempMouseup);
    };
  }, [isMouseDown, onDrawLine, onDrawShape]);
}
