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
import { Color } from './component/color';
import { Health } from './component/health';
import { Movement } from './component/movement';
import { Location } from './component/location';
import { Render } from './component/render';
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
import { SpawnSystem } from './system/spawnSystem';
import { Respawn } from './component/respawn';
import { CollisionOpponent } from './component/collisionOpponent';
import { AttackSystem } from './system/attackSystem';
import { TakeDamage } from './component/takeDamage';
import { Damage } from './component/damage';
import { DamageSystem } from './system/damageSystem';
import { World } from '../ecs/world';

const initComponents = (world: World, size: number) => {
  world.registerComponentType(Location, 10, (x: number = 0, y: number = 0) => [
    new Vector2(x, y),
  ]);

  world.registerComponentType(
    Movement,
    10,
    (x: number = 10, y: number = 10) => [new Vector2(x, y), 0.8]
  );

  world.registerComponentType<Render>(Render, 10, () => [new Square(size)]);

  world.registerComponentType<Color>(Color, 10, () => ['white']);

  world.registerComponentType<Health>(Health, 10, () => [1]);
  world.registerComponentType<Attack>(Attack, 10);
  world.registerComponentType<Damage>(Damage, 10, () => [1]);
  world.registerComponentType<DirectionControl>(DirectionControl, 10, () => [
    new Direction(new Vector2(1, 0)),
  ]);

  world.registerComponentType<Teleport>(Teleport, 10, () => [true]);
  world.registerComponentType<CollisionOpponent>(CollisionOpponent, 10);

  world.registerComponentType<Respawn>(Respawn, 10, () => [0.3]);

  world.registerComponentType<TakeDamage>(TakeDamage, 10);
};

const initEntities = (world: World) => {
  const player = world
    .createEntity()
    .add(Location)
    .add(Movement)
    .add(Render)
    .add(Color)
    .add(Health)
    .add(Attack)
    .add(Damage)
    .add(DirectionControl)
    .add(Teleport)
    .add(CollisionOpponent);

  player.get(Color).value = 'lightgreen';

  const food = world
    .createEntity()
    .add(Location)
    .add(Render)
    .add(Color)
    .add(Health)
    .add(Respawn)
    .add(TakeDamage);

  food.get(Color).value = 'red';

  // TODO
  // const poison = new Entity('poison'); // purple
  // const hunter = new Entity('hunter');
};

const initSystems = (
  world: World,
  config: GameConfig,
  context: CanvasRenderingContext2D
) => {
  world
    .registerSystem(new DirectionControlSystem(), 1)
    .registerSystem(new MovementSystem(), 2)
    .registerSystem(new TeleportSystem(config), 3)
    .registerSystem(new CollisionSystem(), 4)
    .registerSystem(new AttackSystem(), 5)
    .registerSystem(new DamageSystem(), 6)
    .registerSystem(new HealthSystem(), 7)
    .registerSystem(new SpawnSystem(), 8)
    .registerSystem(new RenderSystem(context), 9, true);
};

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
  private _world = new World();

  private update(deltaTime: number): void {
    this._board.clear();
    this._world.update(deltaTime);
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

    initComponents(this._world, this._config.gridSize);
    initEntities(this._world);
    initSystems(this._world, this._config, this._board._context);

    this._world.init(0);

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
