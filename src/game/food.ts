import { Game } from './game';
import { Unit } from './unit';

export class Food extends Unit {
  constructor(game: Game) {
    super(game, 'red', '#FF0059');
  }

  takeDamage() {
    this.death();
  }

  death() {
    this.getBody().forEach(bodyCell => {
      bodyCell.clearEntity();
    });

    this.clearBody();
    this.setHead(this._game._map.getRandomCell());
  };
}
