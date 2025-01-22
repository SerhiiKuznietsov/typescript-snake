import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Death implements IComponent {}

export const DeathPool = new ObjectPool(() => new Death());
