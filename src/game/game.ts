import { KeyControl } from './key-control';
import { Loop } from './loop/loop';
import { GameStateController } from './stateControllers/gameStateController';
import { gameObserver } from './observable/gameEvent';
import { gameStateObserver } from './observable/gameState';
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from './stateControllers/type/type';
import { Board } from './board';
import { GameConfig } from './config/game';
import { initSystems } from './system';
import { World } from '../ecs/World';
import { SystemRegistry } from '../ecs/SystemRegistry';
import { GridManager } from './managers/GridManager';
import { registerComponents } from './component/components';
import { InputManager } from './managers/InputManager';

export class Game {
  private _config = new GameConfig();
  private _stateController = new GameStateController();
  private _loop = new Loop(this.update.bind(this), this.updateFPS.bind(this));
  private _board = new Board('.game__body', 'gameBoard', this._config);
  private _gridManager = new GridManager();
  private _inputManager = new InputManager();
  private _world = new World();
  private _systems = new SystemRegistry(this._world);
  private _resetBtn = new KeyControl(
    document.querySelector('.reset__btn'),
    'click',
    this.restart.bind(this)
  );

  private _fpsElement = document.querySelector('.game__fps') as Element;

  private _pauseHandler = () => {
    this.pause();
    console.log('pause');
  };

  private updateFPS(fps: number = 0) {
    this._fpsElement.textContent = `${fps}`;
  }

  private update(deltaTime: number): void {
    this._systems.updateSystems(deltaTime);
  }

  private observerHandler(actionName: GameActionNameType) {
    const newState = this._stateController.changeByActionThrowable(actionName);

    gameObserver.notify(newState);

    if (newState === GameStateList.restart) {
      gameStateObserver.notify(GameAction.toReadyToStart);
    }

    if (newState === GameStateList.lose) this.over();

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }
  }

  private over(): void {
    this._inputManager.removeHandler('Space', this._pauseHandler);
  }

  private pause(): void {
    this._loop.toggle();
  }

  private restart(): void {
    this.clear();
    gameStateObserver.notify(GameAction.toRestart);
    this.start();
  }

  public init(): this {
    this._board.init();
    this._inputManager.addHandler('Space', this._pauseHandler);
    this._resetBtn.on();
    this._gridManager.init(this._config.lastVector);

    gameObserver.attach((stateName) => {
      if (stateName === this._stateController.getActive().name) return;

      throw new Error(
        'State change notification bypasses game state change logic'
      );
    });

    gameStateObserver
      .attach(this.observerHandler.bind(this))
      .notify(GameAction.toReadyToStart);

    registerComponents(this._world);

    initSystems(
      this._systems,
      this._world,
      this._config,
      this._board,
      this._gridManager,
      this._inputManager
    );

    this._systems.awakeSystems();

    return this;
  }

  public start(): this {
    this._loop.start();

    gameStateObserver.notify(GameAction.toStart);
    return this;
  }

  public clear(): void {
    this._board.clearFull();
    this._loop.stop();
    this._systems.destroy();
    this._gridManager.clear();
  }
}
