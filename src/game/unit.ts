import { Cell } from "./cell";
import { MapCells } from "./map-cells";

export class Unit {
  public _map: MapCells;
  private _headColor: string;
  private _bodyColor: string;
  private _borderColor: string;
  private _body: Cell[] = [];

  constructor(
    map: MapCells,
    headColor: string,
    bodyColor: string,
    borderColor: string = "black"
  ) {
    this._map = map;
    this._headColor = headColor;
    this._bodyColor = bodyColor;
    this._borderColor = borderColor;
  }

  protected getHead(): Cell {
    const cell = this._body.at(0);

    if (!cell) {
      throw new Error("Unit body is empty");
    }

    return cell;
  }

  protected setHead(cell: Cell) {
    cell.setEntity(this);
    this._body.unshift(cell);
  }

  protected getBody() {
    return this._body;
  }

  protected removeTail() {
    return this._body.pop();
  }

  protected clearBody() {
    this._body = [];
  }

  public init(cell: Cell) {
    this.setHead(cell);
  }

  public move() {}

  protected takeDamage() {
    this.death();
  }

  protected death() {
    throw new Error("not predefined method");
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { _headColor, _bodyColor, _borderColor } = this;
    if (_borderColor) ctx.strokeStyle = _borderColor;

    this.getBody().forEach((cell, i) => {
      if (i === 0) {
        ctx.fillStyle = _headColor;
      } else {
        ctx.fillStyle = _bodyColor || _headColor;
      }

      ctx.fillRect(...cell.getSize());
      ctx.strokeRect(...cell.getSize());
    });
  }
}
