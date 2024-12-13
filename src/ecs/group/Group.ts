import { ComponentConstructorList } from '../Component';
import { EntityId } from '../Entity';
import { GroupQuery } from './GroupManager';

export class Group {
  public entitiesSet: Set<EntityId> = new Set();
  public entities: EntityId[] = [];

  public has: ComponentConstructorList;
  public not: ComponentConstructorList;

  constructor(query: GroupQuery = []) {
    this.has = query[0] || [];
    this.not = query[1] || [];
  }
}
