import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { System } from './system';
import { DirectionControl } from '../component/directionControl';

export class MovementSystem extends System {
  public requiredComponents = [Location, Movement, DirectionControl];

  update(): void {
    this._entities.forEach((entity) => {
      const location = entity.get(Location);
      const movement = entity.get(Movement);
      const control = entity.get(DirectionControl);

      movement.velocity.setVector(control.direction.getCopy());

      location.position.addVector(movement.velocity);
    });
  }
}
