import { ComponentConstructorList } from '../Component';
import { EntityComponentStorage } from '../EntityComponentStorage';
import { EventBus } from '../EventBus';
import { EcsEvents } from '../EcsEvents';
import { EntityId } from '../Entity';
import { generateKey, GroupKey } from './GroupUtils';
import { GroupIndex } from './GroupIndex';
import { Group } from './Group';

export type GroupQuery = [ComponentConstructorList?, ComponentConstructorList?];

export class GroupManager {
  private _groups: Map<GroupKey, { group: Group; count: number }> = new Map();
  private _groupIndex: GroupIndex = new GroupIndex();
  // TODO - add bit map "EntityComponentStorage.BitMapManager"

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

  public createGroup(query: GroupQuery = []): EntityId[] {
    this.validGroupQuery(query);

    const key = generateKey(query);

    let groupData = this._groups.get(key);
    if (groupData) {
      groupData.count += 1;
      return groupData.group.entities;
    }

    const group = new Group(query);
    this._groups.set(key, { group, count: 1 });
    this._storage.getAllEntities().forEach((entityId) => {
      if (this.matchesGroup(entityId, group)) {
        this.addEntityToGroup(group, key, entityId);
      }
    });
    return group.entities;
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
  }

  private onComponentChanged({ entityId }: { entityId: number }): void {
    this._groups.forEach(({ group }, key) => {
      const isInGroup = group.entitiesSet.has(entityId);
      const matches = this.matchesGroup(entityId, group);

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

  private onEntityCreated({ entityId }: { entityId: number }): void {
    this._groups.forEach(({ group }, key) => {
      if (this.matchesGroup(entityId, group)) {
        this.addEntityToGroup(group, key, entityId);
      }
    });
  }

  private onEntityDeleted({ entityId }: { entityId: number }): void {
    const groupKeys = this._groupIndex.get(entityId);
    if (!groupKeys) return;

    groupKeys.forEach((key) => {
      const groupData = this._groups.get(key);
      if (!groupData) return;

      this.removeEntityFromGroup(groupData.group, key, entityId);
    });

    this._groupIndex.delete(entityId);
  }

  private matchesGroup(entityId: number, group: Group): boolean {
    for (const component of group.has) {
      if (!this._storage.hasComponent(entityId, component)) {
        return false;
      }
    }

    for (const component of group.not) {
      if (this._storage.hasComponent(entityId, component)) {
        return false;
      }
    }

    return true;
  }

  public destroy() {
    this._groups.clear();
    this._groupIndex.clear();
  }
}
