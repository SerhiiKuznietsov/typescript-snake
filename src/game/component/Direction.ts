import { Direction as DirectionControl } from '../geometry/direction';
import { IComponent } from '@/ecs/component';
import { Vector2 } from '../geometry/vector2';

export class Direction implements IComponent {
  public changed = false;

  constructor(readonly id: number, public direction: DirectionControl = new DirectionControl(new Vector2(1, 0))) {}
}
