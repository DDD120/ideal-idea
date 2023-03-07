import { ReturnTools } from "@/types/canvas";
import { useState } from "react";

export default function useTools(): ReturnTools {
  const [tool, setTool] = useState("");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const handleChange = (type: string, value: string) => {
    if (!value) return;
    switch (type) {
      case "color":
        setColor(value);
      case "brush":
        setBrushSize(Number(value));
      case "tool":
        setTool(value);
    }
  };

  return {
    tool,
    color,
    brushSize,
    onToolsChange: handleChange,
  };
}
