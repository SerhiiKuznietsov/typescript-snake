import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class SnakeBody implements IComponent {}

export const SnakeBodyPool = new ObjectPool(() => new SnakeBody());
