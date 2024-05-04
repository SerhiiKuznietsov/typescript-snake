import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { System } from './system';
import { Body } from '../component/body';

export class MovementSystem extends System {
  update(): void {
    this._entities.forEach((entity) => {
      const location = entity.getComponent(Location);
      const movement = entity.getComponent(Movement);

      if (entity.hasComponent(Body)) {
        const body = entity.getComponent(Body);

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
