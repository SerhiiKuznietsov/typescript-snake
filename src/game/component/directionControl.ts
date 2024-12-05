import { Direction } from '../geometry/direction';
import { IComponent } from '../../ecs/component';
import { Vector2 } from '../geometry/vector2';

export class DirectionControl implements IComponent {
  public changed = false;

  constructor(readonly id: number, public direction: Direction = new Direction(new Vector2(1, 0))) {}
}
