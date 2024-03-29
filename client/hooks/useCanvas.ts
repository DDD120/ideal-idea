import { useRoomContext } from "@/context/roomContext";
import { Draw } from "@/utils/types";
import { clearCanvas, drawLine } from "@/utils/drawCanvas";
import { RefObject, useEffect } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function useCanvas({ canvasRef }: Props) {
  const { roomId, socket } = useRoomContext();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;

    socket.emit("canvas-ready", roomId);
    socket.on("canvas-ready", () => {
      if (!canvas.toDataURL()) return;
      socket.emit("canvas-state", {
        roomId,
        canvas: canvas.toDataURL(),
      });
    });
    socket.on("canvas-state", (canvas: string) => {
      const img = new Image();
      img.src = canvas;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    });
    socket.on("canvas-draw", (draw: Draw) => drawLine({ ctx, ...draw }));

    socket.on("canvas-clear", () => clearCanvas(ctx));

    return () => {
      socket.off("canvas-ready");
      socket.off("canvas-state");
      socket.off("canvas-draw");
      socket.off("canvas-clear");
    };
  }, [roomId, socket, clearCanvas]);

  return;
}
