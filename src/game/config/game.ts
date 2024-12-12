import { Vector2 } from '../geometry/vector2';

export class GameConfig {
  public readonly xGridsCount: number = 40;
  public readonly yGridsCount: number = 30;
  public readonly gridSize: number = 20;
  public readonly firstVector: Vector2 = { x: 0, y: 0 };
  public readonly lastVector: Vector2 = {
    x: this.xGridsCount - 1,
    y: this.yGridsCount - 1,
  };
  public readonly boardWidth: number = this.xGridsCount * this.gridSize;
  public readonly boardHeight: number = this.yGridsCount * this.gridSize;
}
