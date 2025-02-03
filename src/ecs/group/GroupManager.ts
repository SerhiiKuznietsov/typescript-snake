import { EntityComponentStorage } from '../EntityComponentStorage';
import { EventBus } from '../EventBus';
import { EventMap } from '../EcsEvents';
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
    private _eventBus: EventBus<EventMap>,
    private _storage: EntityComponentStorage
  ) {
    this._eventBus.on('COMPONENT_ADDED', this.onComponentChanged.bind(this));
    this._eventBus.on('COMPONENT_REMOVED', this.onComponentChanged.bind(this));
    this._eventBus.on('ENTITY_CREATED', this.onEntityCreated.bind(this));
    this._eventBus.on('ENTITY_DELETED', this.onEntityDeleted.bind(this));
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

    this._storage.getAllEntities().forEach((entity) => {
      const entityBits = this._storage.bitMap.getEntityBitMap(entity);
      if (
        BitUtils.areAllBitsSet(entityBits, hasBitMask) &&
        BitUtils.areAnyBitsSet(entityBits, notBitMask) === false
      ) {
        this.addEntityToGroup(group, key, entity);
      }
    });
  }

  private onComponentChanged({ entity }: { entity: EntityId }): void {
    this._groups.forEach(({ group }, key) => {
      const isInGroup = group.entitiesSet.has(entity);
      const entityBits = this._storage.bitMap.getEntityBitMap(entity);
      const { hasBitMask, notBitMask } = this._groupMasks.get(key)!;

      const matches =
        BitUtils.areAllBitsSet(entityBits, hasBitMask) &&
        BitUtils.areAnyBitsSet(entityBits, notBitMask) === false;

      if (matches && !isInGroup) {
        this.addEntityToGroup(group, key, entity);
      } else if (!matches && isInGroup) {
        this.removeEntityFromGroup(group, key, entity);
      }
    });
  }

  private addEntityToGroup(group: Group, groupKey: GroupKey, entity: EntityId) {
    group.entitiesSet.add(entity);
    group.entities.push(entity);
    this._groupIndex.add(entity, groupKey);
  }

  private removeEntityFromGroup(
    group: Group,
    groupKey: GroupKey,
    entity: EntityId
  ) {
    const index = group.entities.indexOf(entity);

    group.entitiesSet.delete(entity);
    group.entities.splice(index, 1);

    this._groupIndex.remove(entity, groupKey);
  }

  private onEntityCreated({ entity }: { entity: EntityId }): void {
    this._groups.forEach(({ group }, key) => {
      const entityBits = this._storage.bitMap.getEntityBitMap(entity);
      const { hasBitMask, notBitMask } = this._groupMasks.get(key)!;

      if (
        BitUtils.areAllBitsSet(entityBits, hasBitMask) &&
        BitUtils.areAnyBitsSet(entityBits, notBitMask) === false
      ) {
        this.addEntityToGroup(group, key, entity);
      }
    });
  }

  private onEntityDeleted({ entity }: { entity: EntityId }): void {
    const groupKeys = this._groupIndex.get(entity);
    if (!groupKeys) return;

    groupKeys.forEach((key) => {
      const groupData = this._groups.get(key);
      if (!groupData) return;

      this.removeEntityFromGroup(groupData.group, key, entity);
    });

    this._groupIndex.delete(entity);
  }

  public destroy() {
    this._groups.clear();
    this._groupIndex.clear();
    this._groupMasks.clear();
  }
}
