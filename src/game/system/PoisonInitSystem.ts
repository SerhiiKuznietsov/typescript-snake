import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createPoison } from '../entities/poison';

export class PoisonInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(public w: World, private _gridSize: number) {}

  public update(): void {
    createPoison(this.w, this._gridSize);
  }
}
