import { Draw, Point } from "@/types/canvas";
import { RefObject, useEffect, useRef, useState } from "react";

interface Props {
  onDraw: (props: Draw) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function useDraw({ onDraw, canvasRef }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => setIsMouseDown(true);

  useEffect(() => {
    const handleMousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    const handleMouseup = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", handleMousemove);
      window.removeEventListener("mouseup", handleMouseup);
    };
  }, [isMouseDown, onDraw]);

  return {
    onMouseDown,
  };
}
