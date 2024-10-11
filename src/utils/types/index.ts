export interface Rectangle {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  scale: { x: number; y: number };
  rotation: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface OBB {
  vertices: Point[];
}
