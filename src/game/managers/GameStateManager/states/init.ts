import { Game } from '@/game/game';
import { GameState } from '../GameStateManager';
import { StartState } from './start';

export class InitState implements GameState {
  public readonly allowedTransitions = [StartState.name];

  constructor(private _g: Game) {}

  public enter(): void {
    this._g.board.init();
    this._g.loop.start();

    this._g.gameStateManager.changeState(StartState.name);
  }
}
