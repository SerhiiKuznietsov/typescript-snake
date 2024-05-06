import { Entity } from '../entity/entity';
import { entityComponentObserver } from '../observable/entityComponent';
import { EntityObserverDataType } from '../observable/type';
import { System } from '../system/system';

export class SystemManager {
  private _list: Array<{ priority: number; system: System }> = [];

  constructor() {
    entityComponentObserver.attach(this.componentChangesHandler.bind(this));
  }

  private matchComponentsRequirements(system: System, entity: Entity) {
    return (
      // system.requiredComponents.length &&
      system.requiredComponents.every((component) => entity.has(component))
    );
  }

  private addComponentHandler(entity: Entity) {
    this._list.forEach((item) => {
      const system = item.system;

      if (
        system.hasEntity(entity) ||
        !this.matchComponentsRequirements(system, entity)
      )
        return;

      system.addEntity(entity);
    });
  }

  private removeComponentHandler(entity: Entity) {
    this._list.forEach((item) => {
      const system = item.system;

      if (
        !system.hasEntity(entity) ||
        this.matchComponentsRequirements(system, entity)
      )
        return;

      system.removeEntity(entity);
    });
  }

  private componentChangesHandler({
    entity,
    operation,
  }: EntityObserverDataType) {
    operation
      ? this.addComponentHandler(entity)
      : this.removeComponentHandler(entity);
  }

  public register(priority: number, system: System): this {
    this._list.push({ priority, system });

    this._list.sort((a, b) => a.priority - b.priority);

    return this;
  }

  public update(entities: Entity[], deltaTime: number) {
    this._list.forEach((item) => {
      item.system.update({ entities, deltaTime });
    });
  }
}
