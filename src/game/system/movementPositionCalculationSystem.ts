import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class MovementPositionCalculationSystem implements ISystem {
  public entities = this.w.newGroup(
    ['Position', 'Direction', 'CanMove'],
    ['MoveTo']
  );

  constructor(public w: World) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const position = this.w.getComponent(entity, 'Position');
      const direction = this.w.getComponent(entity, 'Direction');
      const velocity = this.w.getComponent(entity, 'Velocity', { value: 1 });

      this.w.removeComponent(entity, 'CanMove');
      this.w.getComponent(entity, 'MoveTo', {
        x: position.x + direction.x * velocity.value,
        y: position.y + direction.y * velocity.value,
      });
    }
  }
}
