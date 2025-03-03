import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Player implements IComponent {}

export const PlayerPool = new ObjectPool(() => new Player(), { maxSize: 1 });
