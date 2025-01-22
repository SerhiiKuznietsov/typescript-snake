import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Attacker implements IComponent {}

export const AttackerPool = new ObjectPool(() => new Attacker());
