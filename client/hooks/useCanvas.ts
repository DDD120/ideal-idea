import { useSocket } from "@/store/socket";
import { drawLine } from "@/utils/canvas";
import { RefObject, useEffect } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function useCanvas({ canvasRef }: Props) {
  const socket = useSocket();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.on("draw-line", ({ currentPoint, prevPoint }) => {
      if (!ctx) return;
      drawLine({ ctx, currentPoint, prevPoint });
    });

    return () => {
      socket.off("draw-line");
    };
  }, [canvasRef, socket]);

  return;
}
