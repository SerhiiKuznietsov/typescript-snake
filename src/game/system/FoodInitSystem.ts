import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createFood } from '../entities/food';

export class FoodInitSystem implements ISystem {
  public oneShot: boolean = true;
  private _foodCount: number;

  constructor(
    public w: World,
    private _gridSize: number,
    width: number,
    height: number
  ) {
    const fieldArea = width * height;
    const densityFactor = 0.01;

    this._foodCount = Math.max(1, Math.floor(fieldArea * densityFactor));
  }

  public update(): void {
    for (let i = 0; i < this._foodCount; i++) {
      createFood(this.w, this._gridSize);
    }
  }
}
