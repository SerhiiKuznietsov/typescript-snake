export const createKey = (x: number, y: number): string => `${x}-${y}`;
export const parseKey = (id: string): { x: number; y: number } => {
  const [x, y] = id.split('-');

  return { x: +x, y: +y };
};
