import { Game } from '@/game/game';
import { GameState } from '../GameStateManager';
import { ClearState } from './clear';

export class LoseState implements GameState {
  public readonly allowedTransitions = [ClearState.name];

  constructor(private _g: Game) {}

  public enter(): void {
    this._g.inputManager.removeHandler('Space', this._g.pauseHandler);
    this._g.board.drawText('You lose');
  }
}
