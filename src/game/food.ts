import { MapCells } from "./map-cells";
import { Unit } from "./unit";

export class Food extends Unit {
  constructor(map: MapCells) {
    super(map, "red", "#FF0059");
  }

  takeDamage() {
    this.death();
  }

  death() {
    this.getBody().forEach((bodyCell) => {
      bodyCell.clearEntity();
    });

    this.clearBody();
    this.setHead(this._map.getRandomCell());
  }
}
