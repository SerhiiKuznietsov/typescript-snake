import { Vector2 } from '../geometry/vector2';

export class GameConfig {
  public xGridsCount: number = 30;
  public yGridsCount: number = 20;
  public gridSize: number = 24;
  public firstVector: Vector2 = { x: 0, y: 0 };
  public lastVector: Vector2 = {
    x: this.xGridsCount - 1,
    y: this.yGridsCount - 1,
  };
  public fieldArea: number = this.xGridsCount * this.yGridsCount;
  public foodDumpDensity: number = 0.005;
  public foodCount: number = Math.max(
    1,
    Math.floor(this.fieldArea * this.foodDumpDensity)
  );
  public poisonCount: number = 1;
  public hunterCount: number = 3;
  public boardWidth: number = this.xGridsCount * this.gridSize;
  public boardHeight: number = this.yGridsCount * this.gridSize;
}
