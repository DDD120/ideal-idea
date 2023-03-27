import { useRoomContext } from "@/context/roomContext";
import { DrawLine, Point } from "@/utils/types";
import { computePoint } from "@/utils/drawCanvas";
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
  const { socket, roomId } = useRoomContext();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const canvasTemp = canvasTempRef.current!;
    const ctx = canvas.getContext("2d")!;
    const ctxShape = canvasTemp.getContext("2d")!;

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

    const handleShapeMousedown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const currentPoint = computePoint(canvasTemp, e);
      if (!currentPoint) return;

      prevPoint.current = currentPoint;
    };

    const handleShapeMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvasTemp, e);
      if (!currentPoint) return;

      onDrawShape({
        ctx: ctxShape,
        currentPoint,
        prevPoint: prevPoint.current,
      });
    };

    const handleShapeMouseup = async () => {
      setIsMouseDown(false);
      prevPoint.current = null;
      const canvas = canvasTemp.toDataURL();
      const img = new Image();
      img.src = canvas;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        socket.emit("canvas-state", { roomId, canvas });
        ctxShape.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };
    };

    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mousemove", handleMousemove);
    canvas.addEventListener("mouseup", handleMouseup);
    canvasTemp.addEventListener("mousedown", handleShapeMousedown);
    canvasTemp.addEventListener("mousemove", handleShapeMousemove);
    canvasTemp.addEventListener("mouseup", handleShapeMouseup);

    return () => {
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mousemove", handleMousemove);
      canvas.removeEventListener("mouseup", handleMouseup);
      canvasTemp.removeEventListener("mousedown", handleShapeMousedown);
      canvasTemp.removeEventListener("mousemove", handleShapeMousemove);
      canvasTemp.removeEventListener("mouseup", handleShapeMouseup);
    };
  }, [isMouseDown, onDrawLine, onDrawShape]);
}
