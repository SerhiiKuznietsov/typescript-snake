import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createHunter } from '../entities/hunter';

export class HunterInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(public w: World, private _gridSize: number) {}

  public update(): void {
    createHunter(this.w, this._gridSize);
  }
}
