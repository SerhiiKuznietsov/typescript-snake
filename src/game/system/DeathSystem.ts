import { World } from '@/ecs/World';
import { ISystem } from '@/ecs/SystemRegistry';
import { GridManager } from '../GridManager';

export class DeathSystem implements ISystem {
  private entities = this.w.newGroup(['Death']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      this._grid.removeEntity(entity);

      if (!this.w.hasComponent(entity, 'Respawn')) {
        this.w.deleteEntity(entity);
        return;
      }

      if (this.w.hasComponent(entity, 'Position')) {
        this.w.removeComponent(entity, 'Position');
      }
    }
  }
}
