import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { System } from './system';
import { Body } from '../component/body';

export class MovementSystem extends System {
  update(): void {
    this._entities.forEach((entity) => {
      const location = entity.get(Location);
      const movement = entity.get(Movement);

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
