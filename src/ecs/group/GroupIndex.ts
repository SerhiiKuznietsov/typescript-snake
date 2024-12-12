import { EntityId } from '../Entity';
import { GroupKey } from './GroupUtils';

export class GroupIndex {
  private _entityGroupIndex: Map<EntityId, Set<GroupKey>> = new Map();

  public add(entityId: EntityId, groupKey: GroupKey): void {
    if (!this._entityGroupIndex.has(entityId)) {
      this._entityGroupIndex.set(entityId, new Set());
    }
    this._entityGroupIndex.get(entityId)!.add(groupKey);
  }

  public remove(entityId: EntityId, groupKey: GroupKey): void {
    const groups = this._entityGroupIndex.get(entityId);
    if (!groups) return;

    groups.delete(groupKey);
    if (groups.size === 0) {
      this._entityGroupIndex.delete(entityId);
    }
  }

  public get(entityId: EntityId): Set<GroupKey> | undefined {
    return this._entityGroupIndex.get(entityId);
  }

  public delete(entityId: EntityId): void {
    this._entityGroupIndex.delete(entityId);
  }

  public clear() {
    this._entityGroupIndex.clear();
  }
}
