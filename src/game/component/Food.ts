import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Food implements IComponent {}

export const FoodPool = new ObjectPool(() => new Food());
