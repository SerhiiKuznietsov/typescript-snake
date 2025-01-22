import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Poison implements IComponent {}

export const PoisonPool = new ObjectPool(() => new Poison());
