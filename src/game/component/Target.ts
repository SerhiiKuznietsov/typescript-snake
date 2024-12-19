import { IComponent } from '@/ecs/Component';
import { EntityId } from '@/ecs/Entity';

export class Target implements IComponent {
  constructor(public targetId: EntityId | null = null) {}
}
