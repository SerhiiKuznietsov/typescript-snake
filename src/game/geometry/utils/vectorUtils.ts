import { Vector2 } from '../vector2';

export const vectorUtils = {
  set: (vector: Vector2, x: number, y: number): Vector2 => {
    vector.x = x;
    vector.y = y;
    return vector;
  },
  setVector: (target: Vector2, source: Vector2): Vector2 => {
    target.x = source.x;
    target.y = source.y;
    return target;
  },
  add: (vector: Vector2, x: number, y: number): Vector2 => {
    vector.x += x;
    vector.y += y;
    return vector;
  },
  addVector: (target: Vector2, source: Vector2): Vector2 => {
    target.x += source.x;
    target.y += source.y;
    return target;
  },
  isEqual: (v1: Vector2, v2: Vector2): boolean => {
    return v1.x === v2.x && v1.y === v2.y;
  },
  copy: (vector: Vector2): Vector2 => {
    const copy = { ...vector };
    return { x: copy.x, y: copy.y };
  },
};
