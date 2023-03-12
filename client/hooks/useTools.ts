import { ReturnTools, Shape, Tool } from "@/types/canvas";
import { useState } from "react";

const shape: Shape[] = ["square", "circle", "straight"];

export default function useTools(): ReturnTools {
  const [isShapeTool, setIsShapeTool] = useState(false);
  const [isShapeFill, setIsShapeFill] = useState(false);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const handleShapeFillChange = (isChecked: boolean) => {
    setIsShapeFill(isChecked);
  };

  const handleToolChange = (type: string, value: string) => {
    if (!value) return;
    switch (type) {
      case "color":
        setColor(value);
        break;
      case "brush":
        setBrushSize(Number(value));
        break;
      case "tool":
        setTool(value as Tool);
        shape.some((item) => item === value)
          ? setIsShapeTool(true)
          : setIsShapeTool(false);
        break;
    }
  };

  return {
    tool,
    color,
    brushSize,
    isShapeFill,
    isShapeTool,
    onShapeFillChange: handleShapeFillChange,
    onToolChange: handleToolChange,
  };
}
