// import { Health } from '../component/health';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { ISystem } from '@/ecs/SystemRegistry';
import { EntityId } from '@/ecs/entity';
import { Board } from '../board';
import { World } from '@/ecs/World';
import { Attack } from '../component/attack';

export class RenderSystem implements ISystem {
  public entities: EntityId[] = [];

  constructor(private _board: Board, public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [Render, Location]);
  }

  public update(): void {
    this.entities.sort((entity1, entity2) => {
      const a = this.w.getComponent(entity1, Render);
      const b = this.w.getComponent(entity2, Render);

      return a.zIndex - b.zIndex;
    });

    this.entities.forEach((entity) => {
      const render = this.w.getComponent(entity, Render);
      const location = this.w.getComponent(entity, Location);

      this._board.render(render, location.position);
    });
  }
}
