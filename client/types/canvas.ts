export interface DrawLine {
  currentPoint: Point;
  prevPoint: Point | null;
}

export interface Draw extends DrawLine {
  ctx: CanvasRenderingContext2D;
}

export interface Point {
  x: number;
  y: number;
}
