import { Body } from '../component/body';
import { Health } from '../component/health';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { System } from './system';

export class RenderSystem extends System {
  private _ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this._ctx = ctx;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      const render = entity.get(Render);
      const location = entity.get(Location);

      if (!entity.has(Health) || !entity.get(Health).isAlive) return;

      render.draw(this._ctx, location.position);

      if (!entity.has(Body)) return;

      const body = entity.get(Body);

      body.segments.forEach((location) => {
        render.draw(this._ctx, location.position);
      });
    });
  }
}
