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
  distance(v1: Vector2, v2: Vector2): number {
    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  direction(from: Vector2, to: Vector2): Vector2 {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      return { x: Math.sign(dx), y: 0 };
    } else {
      return { x: 0, y: Math.sign(dy) };
    }
  },
  copy: (vector: Vector2): Vector2 => {
    return { ...vector };
  },
};
