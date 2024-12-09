import { ComponentConstructorList } from '../component';
import { EntityId } from '../entity';

export class Group {
  public entitiesSet: Set<EntityId> = new Set();
  public entities: EntityId[] = [];

  constructor(
    public has: ComponentConstructorList = [],
    public not: ComponentConstructorList = []
  ) {}
}
