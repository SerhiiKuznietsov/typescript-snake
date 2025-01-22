import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class RespawnReady implements IComponent {}

export const RespawnReadyPool = new ObjectPool(() => new RespawnReady());
