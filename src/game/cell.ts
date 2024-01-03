import { Vector2 } from "./geometry/vector2";

export class Cell {
  public cellSize: number;
  private entity: any;
  private xDistances: number;
  private yDistances: number;
  private _position: Vector2;
  public readonly position: Vector2;

  constructor(vector: Vector2, cellSize: number) {
    this._position = vector;
    this.position = vector;
    this.cellSize = cellSize;
    this.xDistances = vector.x * this.cellSize;
    this.yDistances = vector.y * this.cellSize;
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
