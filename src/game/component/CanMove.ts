import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class CanMove implements IComponent {}

export const CanMovePool = new ObjectPool(() => new CanMove());
