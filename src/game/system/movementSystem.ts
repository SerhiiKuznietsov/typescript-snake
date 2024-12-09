import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { DirectionControl } from '../component/directionControl';
import { EntityId } from '@/ecs/entity';
import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class MovementSystem implements ISystem {
  public entities: EntityId[] = [];

  constructor(public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [
      Location,
      Movement,
      DirectionControl,
    ]);
  }

  public update({ deltaTime }: UpdateSystemData): void {
    this.entities.forEach((entity) => {
      const location = this.w.getComponent(entity, Location);
      const movement = this.w.getComponent(entity, Movement);
      const control = this.w.getComponent(entity, DirectionControl);

      movement.accumulatedTime += deltaTime;

      movement.velocity.setVector(control.direction.getCopy());

      while (movement.accumulatedTime >= movement.moveInterval) {
        location.position.addVector(movement.velocity);

        movement.accumulatedTime -= movement.moveInterval;
      }
    });
  }
}
