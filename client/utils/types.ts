export interface Draw {
  tool: Tool;
  color: string;
  brushSize: number;
  currentPoint: Point;
  prevPoint: Point | null;
  isShapeFill?: boolean;
  isMarkerTool?: boolean;
  ctx?: CanvasRenderingContext2D;
}

export type DrawLine = Pick<Draw, "currentPoint" | "prevPoint" | "ctx">;

export interface Point {
  x: number;
  y: number;
}

export interface Tools {
  tool: Tool;
  color: string;
  brushSize: number;
}

export type Tool =
  | "pen"
  | "eraser"
  | "marker"
  | "square"
  | "circle"
  | "straight";

export type Shape = Extract<Tool, "square" | "circle" | "straight">;

export interface ReturnTools extends Tools {
  isShapeTool: boolean;
  isShapeFill: boolean;
  isMarkerTool: boolean;
  onShapeFillChange: (isChecked: boolean) => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: string) => void;
  onToolChange: (tool: Tool) => void;
}

export interface User {
  id: string;
  nickname: Nickname;
}

export interface Message {
  type: "user" | "notice";
  nickname?: Nickname;
  content: string;
}

export type Nickname = "토끼" | "고양이" | "강아지" | "여우";