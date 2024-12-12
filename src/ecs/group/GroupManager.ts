import { ComponentConstructorList } from '../Component';
import { EntityComponentStorage } from '../EntityComponentStorage';
import { EventBus } from '../EventBus';
import { ISystem } from '../SystemRegistry';
import { EcsEvents } from '../EcsEvents';
import { EntityId } from '../Entity';
import { generateKey, GroupKey } from './GroupUtils';
import { GroupIndex } from './GroupIndex';
import { Group } from './Group';

export class GroupManager {
  private _groups: Map<GroupKey, Group> = new Map();
  private _systemGroups: Map<ISystem, Set<GroupKey>> = new Map();
  private _groupIndex: GroupIndex = new GroupIndex();

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
    this._eventBus.on(
      EcsEvents.SYSTEM_REMOVED,
      this.onSystemRemoved.bind(this)
    );
  }

  public createGroup(
    system: ISystem,
    has: ComponentConstructorList,
    not: ComponentConstructorList = []
  ): EntityId[] {
    if (has?.length > 5) {
      throw new Error(
        'Group limit error. There can be no more than 5 search components'
      );
    }

    if (not?.length > 2) {
      throw new Error(
        'Group limit error. There can be no more than 2 search components'
      );
    }

    const key = generateKey(has, not);
    let group: Group;

    if (this._groups.has(key)) {
      group = this._groups.get(key)!;
    } else {
      group = new Group(has, not);
      this._groups.set(key, group);
      this.updateGroupEntities(group, key);
    }

    this.linkGroupToSystem(system, key);

    return group.entities;
  }

  private linkGroupToSystem(system: ISystem, key: string): void {
    if (!this._systemGroups.has(system)) {
      this._systemGroups.set(system, new Set());
    }
    this._systemGroups.get(system)!.add(key);
  }

  public deleteGroupsForSystem(system: ISystem): void {
    const associatedGroups = this._systemGroups.get(system);

    if (!associatedGroups) return;

    associatedGroups.forEach((key) => {
      let isShared = false;
      this._systemGroups.forEach((groupKeys) => {
        if (groupKeys.has(key) && groupKeys !== associatedGroups) {
          isShared = true;
        }
      });

      if (!isShared) {
        this._groups.delete(key);
      }
    });

    this._systemGroups.delete(system);
  }

  private onSystemRemoved({ system }: { system: ISystem }): void {
    this.deleteGroupsForSystem(system);
  }

  private onComponentChanged({ entityId }: { entityId: number }): void {
    this._groups.forEach((group, key) => {
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
    this._groups.forEach((group, key) => {
      if (this.matchesGroup(entityId, group)) {
        this.addEntityToGroup(group, key, entityId);
      }
    });
  }

  private onEntityDeleted({ entityId }: { entityId: number }): void {
    const groupKeys = this._groupIndex.get(entityId);
    if (!groupKeys) return;

    groupKeys.forEach((key) => {
      const group = this._groups.get(key);
      if (group) {
        this.removeEntityFromGroup(group, key, entityId);
      }
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

  private updateGroupEntities(group: Group, key: GroupKey): void {
    this._storage.getAllEntities().forEach((entityId) => {
      if (this.matchesGroup(entityId, group)) {
        this.addEntityToGroup(group, key, entityId);
      }
    });
  }

  public destroy() {
    this._groups.clear();
    this._systemGroups.clear();
    this._groupIndex.clear();
  }
}
