import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class MovementPrevPositionSystem implements ISystem {
  public entities = this.w.newGroup(['Position', 'MoveTo']);

  constructor(public w: World) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const position = this.w.getComponent(entity, 'Position');

      this.w.getComponent(entity, 'PrevPosition', position);
    }
  }
}
