import { Game } from '@/game/game';
import { GameState } from '../GameStateManager';
import { PlayState } from './play';
import { initSystems } from '../../../system/index';
import { registerComponents } from '../../../component/components';

export class StartState implements GameState {
  public readonly allowedTransitions = [PlayState.name];

  constructor(private _g: Game) {}

  public enter(): void {
    this._g.world.init();
    this._g.inputManager.addHandler('Space', this._g.pauseHandler);
    this._g.gridManager.init(this._g.config.lastVector);

    registerComponents(this._g.world);

    initSystems(
      this._g.systems,
      this._g.world,
      this._g.config,
      this._g.board,
      this._g.gridManager,
      this._g.inputManager
    );

    this._g.gameStateManager.changeState(PlayState.name);
  }

  public exit(): void {
    this._g.systems.awakeSystems();
  }
}
