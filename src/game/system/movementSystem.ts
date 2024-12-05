import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { DirectionControl } from '../component/directionControl';
import { Entity } from '../../ecs/entity';
import { ISystem, UpdateSystemData } from '../../ecs/system';

export class MovementSystem implements ISystem {
  public requiredComponents = [Location, Movement, DirectionControl];
  public entities: Entity[] = [];

  public update({ deltaTime }: UpdateSystemData): void {
    this.entities.forEach((entity) => {
      const location = entity.get(Location);
      const movement = entity.get(Movement);
      const control = entity.get(DirectionControl);

      movement.accumulatedTime += deltaTime;

      movement.velocity.setVector(control.direction.getCopy());

      while (movement.accumulatedTime >= movement.moveInterval) {
        location.position.addVector(movement.velocity);

        movement.accumulatedTime -= movement.moveInterval;
      }
    });
  }
}
