import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';

export class SnakeBoundarySystem implements ISystem {
  public entities = this.w.newGroup(['Snake', 'Position']);

  constructor(
    public w: World,
    private fieldWidth: number,
    private fieldHeight: number
  ) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const position = this.w.getComponent(entity, 'Position');

      if (
        position.x < 0 ||
        position.y < 0 ||
        position.x > this.fieldWidth ||
        position.y > this.fieldHeight
      ) {
        this.handleOutOfBounds(entity);
      }
    }
  }

  private handleOutOfBounds(entity: any): void {
    console.log('Game Over!');
  }
}
