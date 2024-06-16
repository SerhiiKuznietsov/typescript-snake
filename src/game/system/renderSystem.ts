import { Health } from '../component/health';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { Color } from '../component/color';
import { ISystem } from '../../ecs/system';
import { Entity } from '../../ecs/entity';

export class RenderSystem implements ISystem {
  public requiredComponents = [Render, Location];
  public entities: Entity[] = [];

  private _ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const render = entity.get(Render);
      const location = entity.get(Location);
      const color = entity.get(Color);

      if (!entity.has(Health) || !entity.get(Health).current) return;

      render.draw(this._ctx, location.position, color);
    });
  }
}
