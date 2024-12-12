import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { ISystem } from '@/ecs/SystemRegistry';
import { Board } from '../board';
import { World } from '@/ecs/World';

export class RenderSystem implements ISystem {
  public entities = this.w.newGroup([Render, Position]);

  constructor(public w: World, private _board: Board) {}

  public update(): void {
    this.entities.sort((entity1, entity2) => {
      const a = this.w.getComponent(entity1, Render);
      const b = this.w.getComponent(entity2, Render);

      return a.zIndex - b.zIndex;
    });

    this.entities.forEach((entity) => {
      const render = this.w.getComponent(entity, Render);
      const position = this.w.getComponent(entity, Position);

      this._board.render(render, position);
    });
  }
}
