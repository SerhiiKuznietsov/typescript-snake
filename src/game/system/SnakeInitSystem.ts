import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createSnake } from '../entities/snake';

export class SnakeInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(public w: World, private _gridSize: number) {}

  public update(): void {
    createSnake(this.w, this._gridSize);
  }
}
