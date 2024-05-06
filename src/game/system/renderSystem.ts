import { Health } from '../component/health';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { System } from './system';

export class RenderSystem extends System {
  public requiredComponents = [Render, Location];

  private _ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this._ctx = ctx;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      const render = entity.get(Render);
      const location = entity.get(Location);

      if (!entity.has(Health) || !entity.get(Health).current) return;

      render.draw(this._ctx, location.position);
    });
  }
}
