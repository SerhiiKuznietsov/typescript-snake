import { LoopController } from './loop/loop-controller';
import { AttackController } from './controllers/attackController';
import { MovableController } from './controllers/movableController';
import { GameObjectController } from './controllers/entityController';
import { GameScene } from './scene/gameScene';
import { Map } from './map/map';
import { GameObjectPoll } from './pool/gameObjectPool';

class CollisionController {

}

export class SnakeGame {
  // public map = new MapCells(this);
  private _gameScene = new GameScene();
  private _loop = new LoopController([this.update.bind(this), this._gameScene.render.bind(this._gameScene)]);
  private _map = new Map();
  private _gameObjectPool = new GameObjectPoll(this._gameScene);
  private _CollisionController = new CollisionController();

  private update() {
    this._gameObjectPool._movableController.update();
  }

  public init() {
    this._gameScene.init();
    this._gameObjectPool.init();
    this._map.init();
    this._gameScene.add(this._map);

    console.log(this._gameScene);


    // this._gameObjectPool.forUse(this._gameScene.add.bind(this._gameScene))

    // this._renderer.
    // const snake = new Snake(
    //   new Vector2(1, 1),
    //   new Size(20, 20),
    //   'green'
    // );

    // this._scene.add();
    // this._scene.add();
  }

  public start() {
    // this.map.create();

    this._loop.start();
  }

  private clear() {
    this._loop.stop();
    // this.map.clear();
    // this.map.draw();
  }

  public over() {
    this._loop.stop();
    // this.map.fillText('GAME OVER!', 'black', '50px MV Boli');
  }

  private pause() {
    this._loop.toggle();
  }

  private restart() {
    this.clear();
    this.start();
  }
}
