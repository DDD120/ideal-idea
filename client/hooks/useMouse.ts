import { useRoom } from "@/store/room";
import { DrawLine, Point } from "@/types/canvas";
import { computePoint } from "@/utils/canvas";
import { RefObject, useEffect, useRef, useState } from "react";

interface Props {
  onDrawLine: (props: DrawLine) => void;
  onDrawShape: (props: DrawLine) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasShapeRef: RefObject<HTMLCanvasElement>;
  canvasMarkerRef: RefObject<HTMLCanvasElement>;
}

export default function useMouse({
  onDrawLine,
  onDrawShape,
  canvasRef,
  canvasShapeRef,
  canvasMarkerRef,
}: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevPoint = useRef<Point | null>(null);
  const { socket, roomId } = useRoom();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const canvasShape = canvasShapeRef.current!;
    const canvasMarker = canvasMarkerRef.current!;
    const ctx = canvas.getContext("2d")!;
    const ctxShape = canvasShape.getContext("2d")!;
    const ctxMarker = canvasMarker.getContext("2d")!;

    const handleMousedown = () => {
      setIsMouseDown(true);
      ctx.globalCompositeOperation = "source-over";
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
      ctx.globalCompositeOperation = "source-over";
    };

    const handleShapeMousedown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const currentPoint = computePoint(canvasShape, e);
      if (!currentPoint) return;

      prevPoint.current = currentPoint;
    };

    const handleShapeMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvasShape, e);
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
      const canvas = canvasShape.toDataURL();
      const img = new Image();
      img.src = canvas;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        socket.emit("canvas-state", { roomId, canvas });
        ctxShape.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };
    };

    const handleMarkerMousedown = () => {
      setIsMouseDown(true);
      ctx.globalCompositeOperation = "darken";
    };

    const handleMarkerMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvasMarker, e);
      if (!currentPoint) return;

      onDrawLine({
        ctx: ctxMarker,
        currentPoint,
        prevPoint: prevPoint.current,
      });
      prevPoint.current = currentPoint;
    };

    const handleMarkerMouseup = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
      const canvas = canvasMarker.toDataURL();
      const img = new Image();
      img.src = canvas;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        socket.emit("canvas-state", { roomId, canvas });
        ctxMarker.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };
    };

    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mousemove", handleMousemove);
    canvas.addEventListener("mouseup", handleMouseup);
    canvasShape.addEventListener("mousedown", handleShapeMousedown);
    canvasShape.addEventListener("mousemove", handleShapeMousemove);
    canvasShape.addEventListener("mouseup", handleShapeMouseup);
    canvasMarker.addEventListener("mousedown", handleMarkerMousedown);
    canvasMarker.addEventListener("mousemove", handleMarkerMousemove);
    canvasMarker.addEventListener("mouseup", handleMarkerMouseup);

    return () => {
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mousemove", handleMousemove);
      canvas.removeEventListener("mouseup", handleMouseup);
      canvasShape.removeEventListener("mousedown", handleShapeMousedown);
      canvasShape.removeEventListener("mousemove", handleShapeMousemove);
      canvasShape.removeEventListener("mouseup", handleShapeMouseup);
      canvasMarker.removeEventListener("mousedown", handleMarkerMousedown);
      canvasMarker.removeEventListener("mousemove", handleMarkerMousemove);
      canvasMarker.removeEventListener("mouseup", handleMarkerMouseup);
    };
  }, [isMouseDown, onDrawLine, onDrawShape]);
}
