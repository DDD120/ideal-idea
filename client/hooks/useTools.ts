import { useRoomContext } from "@/context/roomContext";
import { ReturnTools, Shape, Tool } from "@/utils/types";
import { useEffect, useState } from "react";

const shape: Shape[] = ["square", "circle", "straight"];

export default function useTools(): ReturnTools {
  const [isShapeTool, setIsShapeTool] = useState(false);
  const [isMarkerTool, setIsMarkerTool] = useState(false);
  const [isShapeFill, setIsShapeFill] = useState(false);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const { isMsgActive } = useRoomContext();

  const handleShapeFillChange = (isChecked: boolean) => {
    setIsShapeFill(isChecked);
  };

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleToolSizeChange = (size: string) => {
    setBrushSize(Number(size));
  };

  const handleToolChange = (tool: Tool) => {
    setTool(tool);
    shape.some((item) => item === tool)
      ? setIsShapeTool(true)
      : setIsShapeTool(false);
    tool === "marker" ? setIsMarkerTool(true) : setIsMarkerTool(false);
  };

  const keyEvent: Record<string, () => void> = {
    r: () => {
      handleToolChange("square");
    },
    c: () => {
      handleToolChange("circle");
    },
    s: () => {
      handleToolChange("straight");
    },
    p: () => {
      handleToolChange("pen");
    },
    e: () => {
      handleToolChange("eraser");
    },
    m: () => {
      handleToolChange("marker");
    },
    f: () => {
      setIsShapeFill((prev) => !prev);
    },
    "]": () => {
      setBrushSize((prevSize) => prevSize + 1);
    },
    "[": () => {
      setBrushSize((prevSize) => prevSize - 1);
    },
  };

  useEffect(() => {
    const handleKeypress = (e: globalThis.KeyboardEvent) => {
      if (isMsgActive) return;
      if (e.key === "[" || e.key === "]") {
        keyEvent[e.key]();
      }
    };

    const handleKeyup = (e: globalThis.KeyboardEvent) => {
      console.log(e.key);
      if (isMsgActive) return;
      if (e.key === "[" || e.key === "]") return;
      keyEvent[e.key] && keyEvent[e.key]();
    };

    document.addEventListener("keypress", handleKeypress);
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keypress", handleKeypress);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [isMsgActive]);

  return {
    tool,
    color,
    brushSize,
    isShapeFill,
    isShapeTool,
    isMarkerTool,
    onShapeFillChange: handleShapeFillChange,
    onColorChange: handleColorChange,
    onBrushSizeChange: handleToolSizeChange,
    onToolChange: handleToolChange,
  };
}
