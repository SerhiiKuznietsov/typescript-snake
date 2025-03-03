import { GameState } from '../GameStateManager';
import { PlayState } from './play';

export class PauseState implements GameState {
  allowedTransitions = [PlayState.name];
}
