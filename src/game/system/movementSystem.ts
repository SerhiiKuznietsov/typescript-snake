import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { System } from './system';
import { DirectionControl } from '../component/directionControl';
import { UpdateSystemData } from '../manager/type';

export class MovementSystem extends System {
  public requiredComponents = [Location, Movement, DirectionControl];

  public update({ deltaTime }: UpdateSystemData): void {
    this._entities.forEach((entity) => {
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
