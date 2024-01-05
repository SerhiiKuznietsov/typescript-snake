import { Vector2 } from "./geometry/vector2";
import { Unit } from "./unit";

export class Food extends Unit {
  constructor(size: number) {
    super("red", "#FF0059", "black", size);
  }

  takeDamage() {
    this.death();
  }

  death() {
    this.clearBody();

    this.clearBody();
    this.init(new Vector2(8, 8));
  }
}
