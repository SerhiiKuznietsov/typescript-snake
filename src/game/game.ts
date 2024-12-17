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
import { keyBoard } from './keyBoard';
import { World } from '../ecs/World';
import { initSystems } from './system';
import { SystemRegistry } from '../ecs/SystemRegistry';
import { GridManager } from './GridManager';

export class Game {
  private _config = new GameConfig();
  private _stateController = new GameStateController();
  private _loop = new Loop(this.update.bind(this), this.updateFPS.bind(this));
  private _board = new Board('.game__body', 'gameBoard', this._config);
  private _gridManager = new GridManager(5);
  private _world = new World();
  private _systems = new SystemRegistry();
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
    keyBoard.removeHandler('Space', this._pauseHandler);
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
    keyBoard.addHandler('Space', this._pauseHandler);
    this._resetBtn.on();

    gameObserver.attach((stateName) => {
      if (stateName === this._stateController.getActive().name) return;

      throw new Error(
        'State change notification bypasses game state change logic'
      );
    });

    gameStateObserver
      .attach(this.observerHandler.bind(this))
      .notify(GameAction.toReadyToStart);

    initSystems(
      this._systems,
      this._world,
      this._config,
      this._board,
      this._gridManager
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
  }
}
