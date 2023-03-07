export interface User {
  id: string;
  nickname: string;
}

export interface Message {
  type: string;
  nickname: string;
  content: string;
}

export interface Draw {
  currentPoint: Point;
  prevPoint: Point | null;
  tool: string;
  color: string;
  brushSize: number;
}

interface Point {
  x: number;
  y: number;
}
