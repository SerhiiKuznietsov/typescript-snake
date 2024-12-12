import { Position } from '../component/Position';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { PrevPosition } from '../component/PrevPosition';
import { MoveTo } from '../component/MoveTo';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup([Position, MoveTo]);
  public positionEntities = this.w.newGroup([Position]);

  constructor(public w: World) {}

  public update(): void {
    this.positionEntities.forEach((entity) => {
      if (this.w.hasComponent(entity, PrevPosition)) {
        this.w.removeComponent(entity, PrevPosition);
      }
    });
    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const moveTo = this.w.getComponent(entity, MoveTo);
      const prevPosition = this.w.getComponent(entity, PrevPosition);

      vectorUtils.setVector(prevPosition, position);
      vectorUtils.setVector(position, moveTo);

      this.w.removeComponent(entity, MoveTo);
    });
  }
}
