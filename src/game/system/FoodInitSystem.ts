import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { createFood } from '../entities/food';

export class FoodInitSystem implements ISystem {
  public oneShot: boolean = true;

  constructor(public w: World, private gridSize: number) {}

  public update(): void {
    createFood(this.w, this.gridSize);
  }
}
