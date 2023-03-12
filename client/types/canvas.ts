export interface Draw {
  tool: Tool;
  color: string;
  brushSize: number;
  currentPoint: Point;
  prevPoint: Point | null;
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

export type Tool = "pen" | "eraser" | "rectangle" | "circle" | "straight";

export type Shape = Extract<Tool, "rectangle" | "circle" | "straight">;

export interface ReturnTools extends Tools {
  isShapeTool: boolean;
  onToolsChange: (type: string, value: string) => void;
}
