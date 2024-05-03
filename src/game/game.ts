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
import { Vector2 } from './geometry/vector2';
import { Direction } from './geometry/direction';
import { Color } from './utils/color';
import { Health } from './component/health';
import { Movement } from './component/movement';
import { Location } from './component/location';
import { Render } from './component/render';
import { Entity } from './entity/entity';
import { HealthSystem } from './system/healthSystem';
import { MovementSystem } from './system/movementSystem';
import { RenderSystem } from './system/renderSystem';
import { DirectionControl } from './component/directionControl';
import { DirectionControlSystem } from './system/directionControlSystem';
import { Teleport } from './component/teleport';
import { TeleportSystem } from './system/teleportSystem';
import { Attack } from './component/attack';
import { Square } from './geometry/shape/square';
export class Game {
  private _resetBtn = new KeyControl(
    document.querySelector('.reset__btn'),
    'click',
    this.restart.bind(this)
  );

  private _pauseHandler = () => {
    this.pause();
  };

  private _config = new GameConfig();
  private _stateController = new GameStateController();
  private _loop = new Loop(this.update.bind(this), this.display.bind(this));
  private _board = new Board('.game__body', 'gameBoard', this._config);
  private _renderSystem = new RenderSystem(this._board._context);
  private _movementSystem = new MovementSystem();
  private _healthSystem = new HealthSystem();
  private _directionControlSystem = new DirectionControlSystem();
  private _teleportSystem = new TeleportSystem(this._config);

  private update(): void {
    this._directionControlSystem.update();
    this._movementSystem.update();
    this._teleportSystem.update();
    this._healthSystem.update();
  }

  private display(): void {
    this._board.clear();
    this._renderSystem.update();
  }

  public init(): Game {
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

    const size = this._config.gridSize;

    const player = new Entity('player');

    player
      .addComponent(new Location(player, new Vector2(0, 5)))
      .addComponent(new Movement(player, new Vector2(0.5, 0.5)))
      .addComponent(
        new Render(player, new Square(size, new Color('lightgreen')))
      )
      .addComponent(new Health(player, false))
      .addComponent(new Attack(player))
      .addComponent(
        new DirectionControl(player, new Direction(new Vector2(1, 0)))
      )
      .addComponent(new Teleport(player));

    this._directionControlSystem.addEntity(player);
    this._healthSystem.addEntity(player);
    this._movementSystem.addEntity(player);
    this._teleportSystem.addEntity(player);
    this._renderSystem.addEntity(player);

    const food = new Entity('food');

    food
      .addComponent(new Location(food, new Vector2(5, 5)))
      .addComponent(new Render(food, new Square(size, new Color('red'))))
      .addComponent(new Health(food, true));

    this._healthSystem.addEntity(food);
    this._renderSystem.addEntity(food);

    // const poison = new Entity('poison'); // purple
    // const hunter = new Entity('hunter');

    return this;
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

  public start(): Game {
    this._loop.start();

    gameStateObserver.notify(GameAction.toStart);
    return this;
  }

  private clear(): void {
    this._board.clear();
    this._loop.stop();
  }

  private over(): void {
    keyBoard.removeHandler('Space', this._pauseHandler);
    // this._loop.stop();
    // this._board.fillText('GAME OVER!', 'black', '50px MV Boli');
  }

  private pause(): void {
    this._loop.toggle();
  }

  private restart(): void {
    this.clear();
    gameStateObserver.notify(GameAction.toRestart);
    this.start();
  }
}
