export class Cell {
  public x: number;
  public y: number;
  public cellSize: number;
  private entity: any;
  private xDistances: number;
  private yDistances: number;

  constructor(x: number, y: number, cellSize: number) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.xDistances = this.x * this.cellSize;
    this.yDistances = this.y * this.cellSize;
    this.entity = undefined;
  }

  public getSize(): [number, number, number, number] {
    return [this.xDistances, this.yDistances, this.cellSize, this.cellSize];
  }

  public isEmpty(): boolean {
    return !this.entity;
  }

  public getEntity(): any {
    return this.entity;
  }

  public setEntity(entity: any) {
    this.entity = entity;
  }

  public clearEntity(): void {
    this.entity = undefined;
  }
}
