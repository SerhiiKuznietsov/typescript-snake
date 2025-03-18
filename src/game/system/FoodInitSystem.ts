import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createFood } from '../entities/food';

export class FoodInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(
    public w: World,
    private _spawnCount: number
  ) {}

  public update(): void {
    for (let i = 0; i < this._spawnCount; i++) {
      createFood(this.w);
    }
  }
}
