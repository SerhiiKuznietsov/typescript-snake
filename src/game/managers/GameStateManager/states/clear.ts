import { Game } from '@/game/game';
import { GameState } from '../GameStateManager';
import { StartState } from './start';

export class ClearState implements GameState {
  public readonly allowedTransitions = [StartState.name];

  constructor(private _g: Game) {}

  public enter(): void {
    this._g.board.clearBoard();
    this._g.systems.destroy();
    this._g.gridManager.clear();
    this._g.world.destroy();
  }
}
