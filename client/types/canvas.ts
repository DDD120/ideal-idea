export interface DrawLine {
  currentPoint: Point;
  prevPoint: Point | null;
  ctx?: CanvasRenderingContext2D;
}

export interface Draw extends DrawLine {
  tool: string;
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

export type Tool = "pen" | "eraser";

export interface ReturnTools extends Tools {
  onToolsChange: (type: string, value: string) => void;
}
