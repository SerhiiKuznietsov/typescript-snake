import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createHunter } from '../entities/hunter';

export class HunterInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(
    public w: World,
    private _spawnCount: number
  ) {}

  public update(): void {
    for (let i = 0; i < this._spawnCount; i++) {
      createHunter(this.w);
    }
  }
}
