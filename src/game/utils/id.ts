export const createKey = (x: number, y: number): string => `${x}-${y}`;
export const parseKey = (id: string): { x: number; y: number } => {
  const arr = id.split('-');

  return { x: +arr[0], y: +arr[1] };
};
