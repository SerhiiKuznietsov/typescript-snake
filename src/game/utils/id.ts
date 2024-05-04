export const createId = (x: number, y: number): string => `${x}-${y}`;
export const parseId = (id: string): [x: number, y: number] => {
  const arr = id.split('-');

  return [+arr[0], +arr[1]];
};
