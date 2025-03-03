import { Game } from '@/game/game';
import { GameState } from '../GameStateManager';
import { StartState } from './start';

export class ClearState implements GameState {
  allowedTransitions = [StartState.name];

  constructor(private _g: Game) {}

  public enter(): void {
    this._g.board.destroy();
    this._g.loop.stop();
    this._g.systems.destroy();
    this._g.gridManager.clear();
  }
}
