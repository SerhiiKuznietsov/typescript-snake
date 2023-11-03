import { LoopController } from "./loop/loop-controller";
import { Food } from "./object/food";
import { Snake } from "./object/snake";
import { Scene } from "./scene/scene";


export class SnakeGame {
  private _loop = new LoopController([this.update.bind(this), this.display.bind(this)]);
  private _scene = new Scene();

  private update(): void {

  }

  private display(): void {
    this._scene.draw();
  }

  public init(): SnakeGame {
    const snake = new Snake();
    const food = new Food();

    this._scene.add(snake);
    this._scene.add(food);

    return this;
  }

  public start(): SnakeGame {


    this._loop.start();

    return this;
  }

  private clear(): void {
    this._loop.stop();
  }

  private over(): void {
    this._loop.stop();
    // this.map.fillText('GAME OVER!', 'black', '50px MV Boli');
  }

  private pause(): void {
    this._loop.toggle();
  }

  private restart(): void {
    this.clear();
    this.start();
  }
}
