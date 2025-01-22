import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class CollisionHandler implements IComponent {}

export const CollisionHandlerPool = new ObjectPool(
  () => new CollisionHandler()
);
