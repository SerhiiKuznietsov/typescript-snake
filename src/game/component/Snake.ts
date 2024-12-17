import { IComponent } from '@/ecs/Component';
import { EntityId } from '@/ecs/Entity';

export class Snake implements IComponent {
  public segments: EntityId[] = [];

  constructor(readonly id: number, public makeSegments: number = 2) {}
}
