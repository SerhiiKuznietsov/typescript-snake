import { ISystem } from '@/ecs/SystemRegistry';
import { Board } from '../board';
import { World } from '@/ecs/World';
import { EntityId } from '@/ecs/Entity';
import { RenderEvents } from './events/render';

export class RenderSystem implements ISystem {
  public entities = this.w.newGroup(['Render', 'Position']);
  public rebornEntities = this.w.newGroup(['Reborn', 'Position', 'Render']);
  public deathEntities = this.w.newGroup(['Death', 'Position', 'Render']);
  public movedEntities = this.w.newGroup(['Moved', 'Position', 'Render']);

  constructor(public w: World, private _board: Board) {}

  public update(): void {

    for (let i = 0; i < this.rebornEntities.length; i++) {
      const entity = this.rebornEntities[i];

      this.draw(entity);
    }

    for (let i = 0; i < this.deathEntities.length; i++) {
      const entity = this.deathEntities[i];
      const position = this.w.getComponent(entity, 'Position');

      this._board.clear(position);
    }

    for (let i = 0; i < this.movedEntities.length; i++) {
      const entity = this.movedEntities[i];

      if (this.w.hasComponent(entity, 'PrevPosition')) {
        const prevPosition = this.w.getComponent(entity, 'PrevPosition');

        this._board.clear(prevPosition);
      }

      this.draw(entity);
    }
  }

  private draw(entity: EntityId) {
    const render = this.w.getComponent(entity, 'Render');
    const position = this.w.getComponent(entity, 'Position');

    this._board.render(render, position);
  }
}
