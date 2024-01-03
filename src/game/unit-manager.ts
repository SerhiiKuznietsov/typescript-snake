import { Unit } from "./unit";
import { GameConfig } from "./config/game";
import { MapCells } from "./map-cells";

export class UnitManager {
  private _map: MapCells;
  private _list: Unit[] = [];

  constructor(map: MapCells) {
    this._map = map;
  }

  public update() {
    this._list.forEach((entity) => entity?.move());
  }

  public init(config: GameConfig) {
    console.log(config);

    config.units.forEach(([unit, count]) => {
      for (let i = 0; i < count; i++) {
        this._list.push(new unit(this._map));
      }
    });

    this._list.forEach((entity) => {
      entity.init(this._map.getRandomCell());
    });
  }

  public clear() {
    this._list = [];
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._list.forEach((entity) => {
      entity.draw(ctx);
    });
  }
}
