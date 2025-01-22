import { IComponent } from '@/ecs/Component';
import { EntityId } from '@/ecs/Entity';

export class Hunts implements IComponent {
  constructor(public target: EntityId | null = null) {}
}
