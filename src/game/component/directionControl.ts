import { Direction } from '../geometry/direction';

export class DirectionControl {
  public changed = false;

  constructor(public direction: Direction) {}
}
