import { DrawLine, Point } from "@/types/canvas";
import { computePoint } from "@/utils/canvas";
import { RefObject, useEffect, useRef, useState } from "react";

interface Props {
  onDraw: (props: DrawLine) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function useMouse({ onDraw, canvasRef }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevPoint = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const handleMousedown = () => {
      setIsMouseDown(true);
    };

    const handleMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoint(canvas, e);
      if (!currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const handleMouseup = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener("mousedown", handleMousedown);
    canvasRef.current?.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);

    return () => {
      canvasRef.current?.removeEventListener("mousedown", handleMousedown);
      canvasRef.current?.removeEventListener("mousemove", handleMousemove);
      window.removeEventListener("mouseup", handleMouseup);
    };
  }, [isMouseDown, onDraw]);
}
