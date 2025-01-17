import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class MovementAreaSystem implements ISystem {
  public entities = this.w.newGroup(['MoveTo']);

  constructor(
    public w: World,
    private fieldWidth: number,
    private fieldHeight: number
  ) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const moveTo = this.w.getComponent(entity, 'MoveTo');

      if (moveTo.x < 0) {
        moveTo.x = this.fieldWidth;
        continue;
      }

      if (moveTo.x > this.fieldWidth) {
        moveTo.x = 0;
        continue;
      }

      if (moveTo.y < 0) {
        moveTo.y = this.fieldHeight;
        continue;
      }

      if (moveTo.y > this.fieldHeight) {
        moveTo.y = 0;
        continue;
      }
    }
  }
}
