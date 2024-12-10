import { Position } from '../component/Position';
import { Direction } from '../component/Direction';
import { CanMove } from '../component/CanMove';
import { Velocity } from '../component/Velocity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup(this, [Position, Direction, CanMove]);

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const direction = this.w.getComponent(entity, Direction);

      let velocity = this.w.hasComponent(entity, Velocity)
        ? this.w.getComponent(entity, Velocity).value
        : 0.1;

      vectorUtils.add(position, direction.x * velocity, direction.y * velocity);

      this.w.removeComponent(entity, CanMove);
    });
  }
}
