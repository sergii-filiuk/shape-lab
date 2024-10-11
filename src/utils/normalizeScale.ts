export const normalizeScale = (scale: { x: number; y: number }) => {
  return { x: scale.x / 100, y: scale.y / 100 };
};
