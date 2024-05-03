import { Entity } from '../entity/entity';
import { Direction } from '../geometry/direction';
import { Component } from './component';

export class DirectionControl extends Component {
  direction: Direction;

  constructor(entity: Entity, vector: Direction) {
    super(entity);
    this.direction = vector;
  }

  public setKey(e: KeyboardEvent): void {
    const code = e.code;

    if (['KeyW', 'ArrowUp'].includes(code)) {
      this.direction.moveY(-1);
      return;
    }

    if (['KeyD', 'ArrowRight'].includes(code)) {
      this.direction.moveX(1);
      return;
    }

    if (['KeyS', 'ArrowDown'].includes(code)) {
      this.direction.moveY(1);
      return;
    }

    if (['KeyA', 'ArrowLeft'].includes(code)) {
      this.direction.moveX(-1);
      return;
    }
  }
}
