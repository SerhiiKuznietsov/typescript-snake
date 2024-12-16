import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { ISystem } from '@/ecs/SystemRegistry';
import { Board } from '../board';
import { World } from '@/ecs/World';
import { EntityId } from '@/ecs/Entity';
import { RenderEvents } from './events/render';

export class RenderSystem implements ISystem {
  public entities = this.w.newGroup([Render, Position]);

  constructor(public w: World, private _board: Board) {}

  public awake(): void {
    this.entities.forEach((entity) => this.draw(entity));
  }

  private handleCleanRender(): void {
    const needClean = this.w.messageBroker.consume(RenderEvents.CLEAN_RENDER);

    needClean.forEach((vector2) => this._board.clear(vector2));
  }

  private handleNewRender(): void {
    const renderEntities = this.w.messageBroker.consume(
      RenderEvents.NEW_RENDER
    );
    const sortedEntities: EntityId[] = [];

    renderEntities.forEach((entity) => {
      if (
        !this.w.hasComponent(entity, Render) ||
        !this.w.hasComponent(entity, Position)
      ) {
        return;
      }

      sortedEntities.push(entity);
    });

    sortedEntities.sort((entity1, entity2) => {
      const a = this.w.getComponent(entity1, Render);
      const b = this.w.getComponent(entity2, Render);

      return a.zIndex - b.zIndex;
    });

    sortedEntities.forEach((entity) => this.draw(entity));
  }

  public update(): void {
    this.handleCleanRender();
    this.handleNewRender();
  }

  private draw(entity: EntityId) {
    const render = this.w.getComponent(entity, Render);
    const position = this.w.getComponent(entity, Position);

    this._board.render(render, position);
  }
}
