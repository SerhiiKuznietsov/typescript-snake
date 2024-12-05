import { Health } from '../component/health';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { ISystem } from '../../ecs/system';
import { Entity } from '../../ecs/entity';
import { Board } from '../board';

export class RenderSystem implements ISystem {
  public requiredComponents = [Render, Location];
  public entities: Entity[] = [];

  private _board: Board;

  constructor(board: Board) {
    this._board = board;
  }

  public update(): void {
    this.entities.sort((entity1, entity2) => {
      const a = entity1.get(Render);
      const b = entity2.get(Render);

      return a.zIndex - b.zIndex;
    });

    this.entities.forEach((entity) => {
      const render = entity.get(Render);
      const location = entity.get(Location);

      if (!entity.has(Health) || !entity.get(Health).current) return;

      this._board.render(render, location.position);
    });
  }
}
