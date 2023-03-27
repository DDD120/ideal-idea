import Square from "@/public/svg/square.svg";
import Circle from "@/public/svg/circle.svg";
import Straight from "@/public/svg/straight.svg";
import Pen from "@/public/svg/pen.svg";
import Eraser from "@/public/svg/eraser.svg";
import Marker from "@/public/svg/marker.svg";
import { Tool } from "@/utils/types";
import { ChangeEvent } from "react";

interface Props {
  currentTool: Tool;
  tool: Tool;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  shortcut: string;
  children: React.ReactNode;
}

export default function InputTool({
  currentTool,
  tool,
  onChange,
  shortcut,
  children,
}: Props) {
  const iconDefaultProps = {
    width: "24",
    height: "24",
    fill: currentTool === tool ? "#f76597" : "white",
  };
  const icon: Record<Tool, React.SVGProps<SVGSVGElement>> = {
    square: <Square {...iconDefaultProps} />,
    circle: <Circle {...iconDefaultProps} />,
    straight: <Straight {...iconDefaultProps} transform="rotate(45)" />,
    pen: <Pen {...iconDefaultProps} />,
    eraser: <Eraser {...iconDefaultProps} />,
    marker: <Marker {...iconDefaultProps} />,
  };

  return (
    <>
      <input
        type="radio"
        id={tool}
        name="tools"
        value={tool}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={tool}
        className="cursor-pointer p-1 flex items-center gap-3 my-2"
        title={shortcut}
      >
        <>
          {icon[tool]}
          <p className={currentTool === tool ? "text-pink" : "text-white"}>
            {children}
          </p>
        </>
      </label>
    </>
  );
}
