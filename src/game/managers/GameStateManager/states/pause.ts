import { GameState } from '../GameStateManager';
import { PlayState } from './play';

export class PauseState implements GameState {
  public readonly allowedTransitions = [PlayState.name];
}
