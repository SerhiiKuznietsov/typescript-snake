import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Moved implements IComponent {}

export const MovedPool = new ObjectPool(() => new Moved());
