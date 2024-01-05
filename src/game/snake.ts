import { KeyControl } from "./key-control";
import { Direction } from "./direction";
import { Unit } from "./unit";
import { gameStateObserver } from "./observable/gameState";
import { GameAction } from "./stateControllers/type/type";
import { Tail } from "./tail";
import { Vector2 } from "./geometry/vector2";
import { Cube } from "./geometry/cube";

const getSnakeDirection = () => {
  const snakeDirection = new Direction();

  snakeDirection.setHandlerX([68, 39], "+");
  snakeDirection.setHandlerX([65, 37], "-");
  snakeDirection.setHandlerY([83, 40], "+");
  snakeDirection.setHandlerY([87, 38], "-");

  new KeyControl<KeyboardEvent>(document, "keydown", (e) => {
    e.preventDefault();
    snakeDirection.handle.bind(snakeDirection)(e.keyCode);
  }).on();

  return snakeDirection;
};

export class Snake extends Unit {
  private _moveDirection = getSnakeDirection();

  constructor(size: number) {
    super("lightgreen", "#60DA81", "black", size);
  }

  move() {
    // this._body.forEach((tail, i) => {
    //   const prevTail = this._body[i + 1];

    //   if (!prevTail) return;

    //   prevTail.position.set(tail.position.x, tail.position.y);
    // });

    const tail = this.getHead();

    const [x, y] = this._moveDirection.calcDirection(tail.position);
    tail.position.set(x, y);

    // const cell = this._map.getCell(x, y);

    // if (cell.isEmpty()) {
    //   this.removeTail()?.clearEntity();
    // } else {
    //   const entity = cell.getEntity();

    //   if (entity instanceof Snake) {
    //     gameStateObserver.notify(GameAction.toLose);
    //   } else {
    //     entity.takeDamage();
    //   }
    // }

    // this.setHead(cell);
  }
}
