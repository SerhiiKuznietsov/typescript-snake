import { KeyControl } from "./key-control";
import { Direction } from "./direction";
import { Unit } from "./unit";
import { Game } from "./game";
import { gameStateObserver } from "./observable/gameState";
import { GameAction } from "./stateControllers/type/type";

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

  constructor(game: Game) {
    super(game, "lightgreen", "#60DA81", "black");
  }

  move() {
    const [x, y] = this._moveDirection.calcDirection(this.getHead());
    const cell = this._game._map.getCell(x, y);

    if (cell.isEmpty()) {
      this.removeTail()?.clearEntity();
    } else {
      const entity = cell.getEntity();

      if (entity instanceof Snake) {
        gameStateObserver.notify(GameAction.toLose);
      } else {
        entity.takeDamage();
      }
    }

    this.setHead(cell);
  }
}
