import { Movement } from '../component/Movement';
import { Position } from '../component/Position';
import { Direction } from '../component/Direction';
import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Velocity } from '../component/Velocity';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup(this, [Position, Movement, Direction]);

  constructor(public w: World) {}

  public update({ deltaTime }: UpdateSystemData): void {
    this.entities.forEach((entity) => {
      const location = this.w.getComponent(entity, Position);
      const movement = this.w.getComponent(entity, Movement);
      const direction = this.w.getComponent(entity, Direction);

      let velocity: number;
      if (this.w.hasComponent(entity, Velocity)) {
        velocity = this.w.getComponent(entity, Velocity).value;
      } else {
        velocity = 0.1;
      }

      movement.accumulatedTime += deltaTime;

      const x = direction.direction.x * velocity;
      const y = direction.direction.y * velocity;

      while (movement.accumulatedTime >= movement.moveInterval) {
        location.position.add(x, y);

        movement.accumulatedTime -= movement.moveInterval;
      }
    });
  }
}
