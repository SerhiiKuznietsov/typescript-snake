import { Movement } from '../component/movement';
import { Location } from '../component/location';
import { System } from './system';

export class MovementSystem extends System {
  update(): void {
    this._entities.forEach((entity) => {
      const location = entity.getComponent(Location);
      const movement = entity.getComponent(Movement);

      if (!location || !movement) return;

      location.position.addVector(movement.velocity);
    });
  }
}
