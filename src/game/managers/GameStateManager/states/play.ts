import { Game } from '@/game/game';
import { GameState } from '../GameStateManager';
import { LoseState } from './lose';
import { PauseState } from './pause';
import { WinState } from './win';

export class PlayState implements GameState {
  public readonly allowedTransitions = [
    WinState.name,
    LoseState.name,
    PauseState.name,
  ];

  constructor(private _g: Game) {}

  public enter(): void {
    this._g.loop.start();
  }

  public update(delta: number): void {
    this._g.systems.update(delta);
  }

  public exit(): void {
    this._g.loop.stop();
    console.log(this._g);
  }
}
