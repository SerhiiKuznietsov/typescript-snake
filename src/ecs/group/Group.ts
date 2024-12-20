import { EntityId } from '../Entity';

export class Group {
  public entitiesSet: Set<EntityId> = new Set();
  public entities: EntityId[] = [];

  constructor(public has: string[] = [], public not: string[] = []) {}
}
