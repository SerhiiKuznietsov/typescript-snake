import { World } from '@/ecs/World';
import { Snake } from '../component/Snake';
import { ISystem } from '@/ecs/SystemRegistry';
import { Position } from '../component/Position';

export class SnakeBoundarySystem implements ISystem {
  public entities = this.w.newGroup([Snake, Position]);

  constructor(
    public w: World,
    private fieldWidth: number,
    private fieldHeight: number
  ) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);

      if (
        position.x < 0 ||
        position.y < 0 ||
        position.x > this.fieldWidth ||
        position.y > this.fieldHeight
      ) {
        this.handleOutOfBounds(entity);
      }
    });
  }

  private handleOutOfBounds(entity: any): void {
    console.log('Game Over!');
  }
}
