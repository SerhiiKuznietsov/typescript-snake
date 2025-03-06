import { EntityId } from '../Entity';
import { GroupKey } from './GroupUtils';

export class GroupIndex {
  private _entityGroupIndex: Map<EntityId, Set<GroupKey>> = new Map();

  public add(entity: EntityId, groupKey: GroupKey): void {
    if (!this._entityGroupIndex.has(entity)) {
      this._entityGroupIndex.set(entity, new Set());
    }
    this._entityGroupIndex.get(entity)!.add(groupKey);
  }

  public remove(entity: EntityId, groupKey: GroupKey): void {
    const groups = this._entityGroupIndex.get(entity);
    if (!groups) return;

    groups.delete(groupKey);
    if (groups.size === 0) {
      this._entityGroupIndex.delete(entity);
    }
  }

  public get(entity: EntityId): Set<GroupKey> | undefined {
    return this._entityGroupIndex.get(entity);
  }

  public delete(entity: EntityId): void {
    this._entityGroupIndex.delete(entity);
  }

  public clear(): void {
    this._entityGroupIndex.clear();
  }
}
