import { Position } from '../component/Position';
import { Direction } from '../component/Direction';
import { CanMove } from '../component/CanMove';
import { Velocity } from '../component/Velocity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { MoveTo } from '../component/MoveTo';

export class MovementPositionCalculationSystem implements ISystem {
  public entities = this.w.newGroup(
    this,
    [Position, Direction, CanMove],
    [MoveTo]
  );

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const direction = this.w.getComponent(entity, Direction);
      const velocity = this.w.hasComponent(entity, Velocity)
        ? this.w.getComponent(entity, Velocity).value
        : 0.1;

      const moveTo = this.w.getComponent(entity, MoveTo);

      vectorUtils.set(
        moveTo,
        position.x + direction.x * velocity,
        position.y + direction.y * velocity
      );
    });
  }
}