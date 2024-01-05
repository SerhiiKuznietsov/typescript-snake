import { Unit } from "./unit";
import { GameConfig } from "./config/game";
import { Vector2 } from "./geometry/vector2";

export class UnitManager {
  private _list: Unit[] = [];
  private _gridSize: number;

  constructor(gridSize: number) {
    this._gridSize = gridSize;
  }

  public init(config: GameConfig) {
    // TODO - transfer only units
    config.units.forEach(([unit, count]) => {
      for (let i = 0; i < count; i++) {
        this._list.push(new unit(this._gridSize));
      }
    });

    this._list.forEach((entity) => {
      entity.init(new Vector2(0, 0));
    });
  }

  public update() {
    this._list.forEach((entity) => entity.move());
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._list.forEach((entity) => entity.draw(ctx));
  }

  public clear() {
    this._list = [];
  }
}
