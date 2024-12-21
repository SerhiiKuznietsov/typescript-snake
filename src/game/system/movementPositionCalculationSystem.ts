import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';

export class MovementPositionCalculationSystem implements ISystem {
  public entities = this.w.newGroup(
    ['Position', 'Direction', 'CanMove'],
    ['MoveTo']
  );

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, 'Position');
      const direction = this.w.getComponent(entity, 'Direction');
      const velocity = this.w.getComponent(entity, 'Velocity', { value: 1 });

      const moveTo = this.w.getComponent(entity, 'MoveTo');

      vectorUtils.set(
        moveTo,
        position.x + direction.x * velocity.value,
        position.y + direction.y * velocity.value
      );

      this.w.removeComponent(entity, 'CanMove');
    });
  }
}
