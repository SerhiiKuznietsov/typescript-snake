import { EntityId } from '../Entity';
import { GroupKey } from './GroupUtils';

export class GroupIndex {
  private entityGroupIndex: Map<EntityId, Set<GroupKey>> = new Map();

  public add(entityId: EntityId, groupKey: GroupKey): void {
    if (!this.entityGroupIndex.has(entityId)) {
      this.entityGroupIndex.set(entityId, new Set());
    }
    this.entityGroupIndex.get(entityId)!.add(groupKey);
  }

  public remove(entityId: EntityId, groupKey: GroupKey): void {
    const groups = this.entityGroupIndex.get(entityId);
    if (!groups) return;

    groups.delete(groupKey);
    if (groups.size === 0) {
      this.entityGroupIndex.delete(entityId);
    }
  }

  public get(entityId: EntityId): Set<GroupKey> | undefined {
    return this.entityGroupIndex.get(entityId);
  }

  public delete(entityId: EntityId): void {
    this.entityGroupIndex.delete(entityId);
  }
}
