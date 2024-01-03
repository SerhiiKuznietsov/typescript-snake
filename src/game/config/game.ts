export class GameConfig {
  public readonly xGridsCount: number = 20;
  public readonly yGridsCount: number = 20;
  public readonly gridSize: number = 20;
  public readonly boardWidth: number = this.xGridsCount * this.gridSize;
  public readonly boardHeight: number = this.yGridsCount * this.gridSize;
}
