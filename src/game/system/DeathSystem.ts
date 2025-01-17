import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { EntityId } from '@/ecs/Entity';
import { GridManager } from '../GridManager';
import { RenderEvents } from './events/render';

export class DeathSystem implements ISystem {
  private entities = this.w.newGroup(['Death', 'Position']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      if (this.w.hasComponent(entity, 'Position')) {
        this._grid.removeEntity(entity);
      }

      if (this.w.hasComponent(entity, 'Respawn')) {
        this.w.removeComponent(entity, 'Death');
        this.w.removeComponent(entity, 'Position');
      } else {
        this.w.messageBroker.publish(
          RenderEvents.CLEAN_RENDER,
          this.w.getComponent(entity, 'Position')
        );
        this.w.deleteEntity(entity);
      }
    }
  }
}
