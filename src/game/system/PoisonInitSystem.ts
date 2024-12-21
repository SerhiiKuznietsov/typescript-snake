import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createPoison } from '../entities/poison';

export class PoisonInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(
    public w: World,
    private _gridSize: number,
    private _spawnCount: number
  ) {}

  public update(): void {
    for (let i = 0; i < this._spawnCount; i++) {
      createPoison(this.w, this._gridSize);
    }
  }
}
