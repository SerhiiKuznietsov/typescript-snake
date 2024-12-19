import { Position } from '../component/Position';
import { Direction } from '../component/Direction';
import { CanMove } from '../component/CanMove';
import { Velocity } from '../component/Velocity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { MoveTo } from '../component/MoveTo';
import { Moved } from '../component/Moved';

export class MovementPositionCalculationSystem implements ISystem {
  public entities = this.w.newGroup([Position, Direction, CanMove], [MoveTo]);
  public needClearEntities = this.w.newGroup([MoveTo, Moved]);

  constructor(public w: World) {}

  public update(): void {
    this.needClearEntities.forEach((entity) => {
      this.w.removeComponent(entity, MoveTo);
    });

    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const direction = this.w.getComponent(entity, Direction);
      const velocity = this.w.hasComponent(entity, Velocity)
        ? this.w.getComponent(entity, Velocity).value
        : 1;

      const moveTo = this.w.getComponent(entity, MoveTo);

      vectorUtils.set(
        moveTo,
        position.x + (direction.x * velocity),
        position.y + (direction.y * velocity)
      );

      this.w.removeComponent(entity, CanMove);
    });
  }
}
