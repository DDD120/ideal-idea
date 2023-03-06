export interface User {
  id: string;
  nickname: string;
}

export interface Message {
  type: string;
  nickname: string;
  content: string;
}

export interface DrawLine {
  currentPoint: Point;
  prevPoint: Point | null;
}

interface Point {
  x: number;
  y: number;
}
