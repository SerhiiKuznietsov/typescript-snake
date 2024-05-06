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
import { CollisionSystem } from './system/collisionSystem';
import { Body } from './component/body';
import { SpawnSystem } from './system/spawnSystem';
import { Respawn } from './component/respawn';
import { CollisionOpponent } from './component/collisionOpponent';
import { AttackSystem } from './system/attackSystem';
import { TakeDamage } from './component/takeDamage';
import { SystemManager } from './manager/systemManager';
import { Damage } from './component/damage';
import { DamageSystem } from './system/damageSystem';

// export class EntityManager {
//   private _list = new Map<string, Entity>();

//   public getEntity(name: string) {
//     const entity = new Entity(name);

//     this._list.set(name, entity);

//     return entity;
//   }
// }

export class Game {
  private _resetBtn = new KeyControl(
    document.querySelector('.reset__btn'),
    'click',
    this.restart.bind(this)
  );

  private _pauseHandler = () => {
    this.pause();
    console.log('pause');
  };

  private _config = new GameConfig();
  private _stateController = new GameStateController();
  private _loop = new Loop(this.update.bind(this));
  private _board = new Board('.game__body', 'gameBoard', this._config);
  private _renderSystem = new RenderSystem(this._board._context);
  private _systemManager = new SystemManager();
  private _entities: Entity[] = [];

  private update(deltaTime: number): void {
    this._board.clear();
    this._systemManager.update(this._entities, deltaTime);
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

    this._systemManager
      .register(1, new DirectionControlSystem())
      .register(2, new MovementSystem())
      .register(3, new TeleportSystem(this._config))
      .register(4, new CollisionSystem())
      .register(5, new AttackSystem())
      .register(6, new DamageSystem())
      .register(7, new HealthSystem())
      .register(8, new SpawnSystem())
      .register(9, this._renderSystem);

    const size = this._config.gridSize;

    const player = new Entity('player')
      .add(new Location(new Vector2(0, 5)))
      .add(new Body())
      .add(new Movement(new Vector2(10, 10)))
      .add(new Render(new Square(size, new Color('lightgreen'))))
      .add(new Health())
      .add(new Attack())
      .add(new Damage())
      .add(new DirectionControl(new Direction(new Vector2(1, 0))))
      .add(new Teleport())
      .add(new CollisionOpponent());

    // TODO - maybe we can rework the body segment logic
    // const tail = new Entity('tail');

    // tail
    // .add(new Target(player))
    // .add(new Location(new Vector2(0, 5)))
    // .add(new Movement(new Vector2(10, 10)))
    // .add(new Render(new Square(size, new Color('lightgreen'))))
    // .add(new Health(false))

    const food = new Entity('food')
      .add(new Location(new Vector2(5, 5)))
      .add(new Render(new Square(size, new Color('red'))))
      .add(new Health())
      .add(new Respawn(0.3))
      .add(new TakeDamage());

    this._systemManager;
    this._entities.push(player, food);

    // const poison = new Entity('poison'); // purple
    // const hunter = new Entity('hunter');
    this._renderSystem.update();
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
