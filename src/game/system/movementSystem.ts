import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { System } from './system';
import { Body } from '../component/body';
import { DirectionControl } from '../component/directionControl';

export class MovementSystem extends System {
  update(): void {
    this._entities.forEach((entity) => {
      if (
        !entity.has(Location) ||
        !entity.has(Movement) ||
        !entity.has(DirectionControl)
      ) {
        return;
      }

      const location = entity.get(Location);
      const movement = entity.get(Movement);
      const control = entity.get(DirectionControl);

      movement.velocity.setVector(control.direction.getCopy());

      if (entity.has(Body)) {
        const body = entity.get(Body);

        const temp = [location, ...body.segments];

        for (let i = temp.length - 1; i > 0; i--) {
          const lastItem = temp[i];
          const item = temp[i - 1];

          lastItem.position.setVector(item.position.copy());
        }
      }

      location.position.addVector(movement.velocity);
    });
  }
}
