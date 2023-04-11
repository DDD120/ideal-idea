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

export default function useEvent({
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

    const drawLineStart = () => {
      setIsMouseDown(true);
    };

    const drawingLine = <T extends MouseEvent | TouchEvent>(e: T) => {
      e.preventDefault();
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

    const drawLineEnd = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
    };

    const drawShapeStart = <T extends MouseEvent | TouchEvent>(e: T) => {
      setIsMouseDown(true);
      const currentPoint = computePoint(canvasTemp, e);
      if (!currentPoint) return;

      prevPoint.current = currentPoint;
    };

    const drawingShape = <T extends MouseEvent | TouchEvent>(e: T) => {
      e.preventDefault();
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvasTemp, e);
      if (!currentPoint) return;

      onDrawShape({
        ctx: ctxShape,
        currentPoint,
        prevPoint: prevPoint.current,
      });
    };

    const drawShapeEnd = async () => {
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

    canvas.addEventListener("mousedown", drawLineStart);
    canvas.addEventListener("mousemove", drawingLine);
    canvas.addEventListener("mouseup", drawLineEnd);
    canvasTemp.addEventListener("mousedown", drawShapeStart);
    canvasTemp.addEventListener("mousemove", drawingShape);
    canvasTemp.addEventListener("mouseup", drawShapeEnd);
    canvas.addEventListener("touchstart", drawLineStart);
    canvas.addEventListener("touchmove", drawingLine);
    canvas.addEventListener("touchend", drawLineEnd);
    canvasTemp.addEventListener("touchstart", drawShapeStart);
    canvasTemp.addEventListener("touchmove", drawingShape);
    canvasTemp.addEventListener("touchend", drawShapeEnd);

    return () => {
      canvas.removeEventListener("mousedown", drawLineStart);
      canvas.removeEventListener("mousemove", drawingLine);
      canvas.removeEventListener("mouseup", drawLineEnd);
      canvasTemp.removeEventListener("mousedown", drawShapeStart);
      canvasTemp.removeEventListener("mousemove", drawingShape);
      canvasTemp.removeEventListener("mouseup", drawShapeEnd);
      canvas.removeEventListener("touchstart", drawLineStart);
      canvas.removeEventListener("touchmove", drawingLine);
      canvas.removeEventListener("touchend", drawLineEnd);
      canvasTemp.removeEventListener("touchstart", drawShapeStart);
      canvasTemp.removeEventListener("touchmove", drawingShape);
      canvasTemp.removeEventListener("touchend", drawShapeEnd);
    };
  }, [isMouseDown, onDrawLine, onDrawShape]);
}
