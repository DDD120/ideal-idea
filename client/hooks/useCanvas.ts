import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";
import { Draw } from "@/types/canvas";
import { clearCanvas, drawLine } from "@/utils/canvas";
import { RefObject, useEffect } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function useCanvas({ canvasRef }: Props) {
  const socket = useSocket();
  const roomId = useRoomId();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.emit("canvas-ready", roomId);
    socket.on("canvas-ready", () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit("canvas-state", {
        roomId,
        canvas: canvasRef.current.toDataURL(),
      });
    });
    socket.on("canvas-state", (canvas: string) => {
      const img = new Image();
      img.src = canvas;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });
    socket.on("draw-line", (draw: Draw) => {
      if (!ctx) return;
      drawLine({ ctx, ...draw });
    });
    socket.on("canvas-clear", () => clearCanvas(canvasRef));

    return () => {
      socket.off("canvas-ready");
      socket.off("canvas-state");
      socket.off("draw-line");
      socket.off("canvas-clear");
    };
  }, [canvasRef, roomId, socket, clearCanvas]);

  return;
}
