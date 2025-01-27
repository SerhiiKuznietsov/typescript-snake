import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Reborn implements IComponent {}

export const RebornPool = new ObjectPool(() => new Reborn());
