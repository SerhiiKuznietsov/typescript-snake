import { Snake } from "./snake";
import { Food } from "./food";
import { Game } from "./game";
import { Unit } from "./unit";

export class UnitManager {
  private _game: Game;
  private _list: Unit[] = [];
  private _unitsCollection: { [key: string]: any } = {
    Snake,
    Food,
  };

  constructor(game: Game) {
    this._game = game;
  }

  private getList(): Unit[] {
    return this._list;
  }

  addUnitByType(name: string, count = 1) {
    if (!(name in this._unitsCollection))
      throw new Error(`unit with name "${name}" not found`);

    for (let i = 0; i < count; i++) {
      const entity = this._unitsCollection[name];

      this.getList().push(new entity(this._game));
    }
  }

  moveEntity() {
    this.getList().forEach((entity) => entity?.move());
  }

  init() {
    this.getList().forEach((entity) => {
      entity.init(this._game._map.getRandomCell());
    });
  }

  clear() {
    this._list = [];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.getList().forEach((entity) => {
      entity.draw(ctx);
    });
  }
}
