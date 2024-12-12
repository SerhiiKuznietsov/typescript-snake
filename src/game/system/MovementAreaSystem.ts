import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { MoveTo } from '../component/MoveTo';

export class MovementAreaSystem implements ISystem {
  public entities = this.w.newGroup(this, [MoveTo]);

  constructor(
    public w: World,
    private fieldWidth: number,
    private fieldHeight: number
  ) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const moveTo = this.w.getComponent(entity, MoveTo);

      if (moveTo.x < 0) {
        moveTo.x = this.fieldWidth;
        return;
      }

      if (moveTo.x > this.fieldWidth) {
        moveTo.x = 0;
        return;
      }

      if (moveTo.y < 0) {
        moveTo.y = this.fieldHeight;
        return;
      }

      if (moveTo.y > this.fieldHeight) {
        moveTo.y = 0;
        return;
      }
    });
  }
}
