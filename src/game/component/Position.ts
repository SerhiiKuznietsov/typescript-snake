import { Vector2 } from '../geometry/vector2';
import { IComponent } from '@/ecs/component';

export class Position implements IComponent {
  constructor(
    readonly id: number,
    public readonly position: Vector2 = new Vector2(0, 0)
  ) {}
}
