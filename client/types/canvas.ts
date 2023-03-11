export interface DrawLine {
  currentPoint: Point;
  prevPoint: Point | null;
  ctx?: CanvasRenderingContext2D;
}

export interface Draw extends DrawLine {
  tool: Tool;
  color: string;
  brushSize: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Tools {
  tool: Tool;
  color: string;
  brushSize: number;
}

export type Tool = "pen" | "eraser" | "rectangle";

export interface ReturnTools extends Tools {
  isShapeTool: boolean;
  onToolsChange: (type: string, value: string) => void;
}
