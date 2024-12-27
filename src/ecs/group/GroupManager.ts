import { EntityComponentStorage } from '../EntityComponentStorage';
import { EventBus } from '../EventBus';
import { EcsEvents } from '../EcsEvents';
import { EntityId } from '../Entity';
import { generateKey, GroupKey } from './GroupUtils';
import { GroupIndex } from './GroupIndex';
import { Group } from './Group';
import { BitUtils } from '../utils/bit';

export type GroupQuery = [string[]?, string[]?];

export class GroupManager {
  private _groups: Map<GroupKey, { group: Group; count: number }> = new Map();
  private _groupIndex: GroupIndex = new GroupIndex();
  private _groupMasks: Map<
    GroupKey,
    { hasBitMask: number; notBitMask: number }
  > = new Map();

  constructor(
    private _eventBus: EventBus,
    private _storage: EntityComponentStorage
  ) {
    this._eventBus.on(
      EcsEvents.COMPONENT_ADDED,
      this.onComponentChanged.bind(this)
    );
    this._eventBus.on(
      EcsEvents.COMPONENT_REMOVED,
      this.onComponentChanged.bind(this)
    );
    this._eventBus.on(
      EcsEvents.ENTITY_CREATED,
      this.onEntityCreated.bind(this)
    );
    this._eventBus.on(
      EcsEvents.ENTITY_DELETED,
      this.onEntityDeleted.bind(this)
    );
  }

  private validGroupQuery(query: GroupQuery) {
    const [has, not] = query;

    if (has && has.length > 5) {
      throw new Error(
        'Group limit error. There can be no more than 5 search components'
      );
    }

    if (not && not.length > 2) {
      throw new Error(
        'Group limit error. There can be no more than 2 search components'
      );
    }
  }

  public getGroup(query: GroupQuery = []): EntityId[] {
    this.validGroupQuery(query);

    const key = generateKey(query);
    let groupData = this._groups.get(key);

    if (!groupData) {
      const group = new Group(query[0] || [], query[1] || []);
      this._groups.set(key, { group, count: 1 });
      this._groupMasks.set(key, this.calculateGroupMasks(group));
      this.updateGroupEntitiesWithMasks(group, key);
      return group.entities;
    }

    groupData.count += 1;
    return groupData.group.entities;
  }

  public releaseGroup(query: GroupQuery = []): void {
    const key = generateKey(query);

    const groupData = this._groups.get(key);
    if (!groupData) {
      throw new Error('Group does not exist.');
    }

    groupData.count -= 1;

    if (groupData.count > 0) return;

    this._groups.delete(key);
    this._groupMasks.delete(key);
  }

  private calculateGroupMasks(group: Group): {
    hasBitMask: number;
    notBitMask: number;
  } {
    const hasBitMask = group.has
      .map((component) => this._storage.bitMap.createComponentBit(component))
      .reduce(BitUtils.setBit, 0);

    const notBitMask = group.not
      .map((component) => this._storage.bitMap.createComponentBit(component))
      .reduce(BitUtils.setBit, 0);

    return { hasBitMask, notBitMask };
  }

  private updateGroupEntitiesWithMasks(group: Group, key: GroupKey): void {
    const { hasBitMask, notBitMask } = this._groupMasks.get(key)!;

    this._storage.getAllEntities().forEach((entityId) => {
      const entityBits = this._storage.bitMap.getEntityBitMap(entityId);
      if (
        BitUtils.areAllBitsSet(entityBits, hasBitMask) &&
        BitUtils.areAnyBitsSet(entityBits, notBitMask) === false
      ) {
        this.addEntityToGroup(group, key, entityId);
      }
    });
  }

  private onComponentChanged({ entityId }: { entityId: EntityId }): void {
    this._groups.forEach(({ group }, key) => {
      const isInGroup = group.entitiesSet.has(entityId);
      const entityBits = this._storage.bitMap.getEntityBitMap(entityId);
      const { hasBitMask, notBitMask } = this._groupMasks.get(key)!;

      const matches =
        BitUtils.areAllBitsSet(entityBits, hasBitMask) &&
        BitUtils.areAnyBitsSet(entityBits, notBitMask) === false;

      if (matches && !isInGroup) {
        this.addEntityToGroup(group, key, entityId);
      } else if (!matches && isInGroup) {
        this.removeEntityFromGroup(group, key, entityId);
      }
    });
  }

  private addEntityToGroup(
    group: Group,
    groupKey: GroupKey,
    entityId: EntityId
  ) {
    group.entitiesSet.add(entityId);
    group.entities.push(entityId);
    this._groupIndex.add(entityId, groupKey);
  }

  private removeEntityFromGroup(
    group: Group,
    groupKey: GroupKey,
    entityId: EntityId
  ) {
    const index = group.entities.indexOf(entityId);

    group.entitiesSet.delete(entityId);
    group.entities.splice(index, 1);

    this._groupIndex.remove(entityId, groupKey);
  }

  private onEntityCreated({ entityId }: { entityId: EntityId }): void {
    this._groups.forEach(({ group }, key) => {
      const entityBits = this._storage.bitMap.getEntityBitMap(entityId);
      const { hasBitMask, notBitMask } = this._groupMasks.get(key)!;

      if (
        BitUtils.areAllBitsSet(entityBits, hasBitMask) &&
        BitUtils.areAnyBitsSet(entityBits, notBitMask) === false
      ) {
        this.addEntityToGroup(group, key, entityId);
      }
    });
  }

  private onEntityDeleted({ entityId }: { entityId: EntityId }): void {
    const groupKeys = this._groupIndex.get(entityId);
    if (!groupKeys) return;

    groupKeys.forEach((key) => {
      const groupData = this._groups.get(key);
      if (!groupData) return;

      this.removeEntityFromGroup(groupData.group, key, entityId);
    });

    this._groupIndex.delete(entityId);
  }

  public destroy() {
    this._groups.clear();
    this._groupIndex.clear();
    this._groupMasks.clear();
  }
}
