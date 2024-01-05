import { Cube } from "./geometry/cube";
import { Vector2 } from "./geometry/vector2";
import { Tail } from "./tail";

export class Unit {
  protected _headColor: string;
  protected _bodyColor: string;
  protected _borderColor: string;
  protected _body: Tail[] = [];
  protected _size: number;

  constructor(
    headColor: string,
    bodyColor: string,
    borderColor: string = "black",
    size: number
  ) {
    this._headColor = headColor;
    this._bodyColor = bodyColor;
    this._borderColor = borderColor;
    this._size = size;
  }

  protected getHead(): Tail {
    const tail = this._body.at(0);

    if (!tail) {
      throw new Error("Unit body is empty");
    }

    return tail;
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

  public init(vector2: Vector2) {
    this._body = [new Tail(vector2, new Cube(this._size), this._headColor)];
  }

  public move() {}

  protected takeDamage() {
    this.death();
  }

  protected death() {
    throw new Error("not predefined method");
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // const { _headColor, _bodyColor, _borderColor } = this;
    // if (_borderColor) ctx.strokeStyle = _borderColor;

    // this._body.forEach((tail, i) => {
    //   if (i === 0) {
    //     ctx.fillStyle = _headColor;
    //   } else {
    //     ctx.fillStyle = _bodyColor || _headColor;
    //   }

    //   ctx.fillRect(
    //     tail.position.x * this._size,
    //     tail.position.y * this._size,
    //     this._size,
    //     this._size
    //   );
    //   ctx.strokeRect(
    //     tail.position.x * this._size,
    //     tail.position.y * this._size,
    //     this._size,
    //     this._size
    //   );
    // });

    this._body.forEach((tail) => {
      tail.draw(ctx);
    });
  }
}
