import { Direction } from '../geometry/direction';
import { IComponent } from '../../ecs/component';

export class DirectionControl implements IComponent {
  public changed = false;

  constructor(readonly id: number, public direction: Direction) {}
}
