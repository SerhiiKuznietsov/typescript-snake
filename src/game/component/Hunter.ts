import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Hunter implements IComponent {}

export const HunterPool = new ObjectPool(() => new Hunter());
