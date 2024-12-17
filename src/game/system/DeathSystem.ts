import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { EntityId } from '@/ecs/Entity';
import { Death } from '../component/Death';
import { Position } from '../component/Position';
import { GridManager } from '../GridManager';
import { Respawn } from '../component/Respawn';
import { RenderEvents } from './events/render';

export class DeathSystem implements ISystem {
  private entities = this.w.newGroup([Death, Position]);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    this.entities.forEach((entity) => {
      this.handleDeath(entity);
    });
  }

  private handleDeath(entity: EntityId): void {
    if (this.w.hasComponent(entity, Position)) {
      this._grid.removeEntity(entity, this.w.getComponent(entity, Position));
    }

    if (this.w.hasComponent(entity, Respawn)) {
      this.w.removeComponent(entity, Death);
      this.w.removeComponent(entity, Position);
    } else {
      this.w.messageBroker.publish(
        RenderEvents.CLEAN_RENDER,
        this.w.getComponent(entity, Position)
      );
      this.w.deleteEntity(entity);
    }
  }
}
