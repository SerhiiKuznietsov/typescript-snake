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
      const render = entity.getComponent(Render);
      const location = entity.getComponent(Location);

      render.draw(this._ctx, location.position);
    });
  }
}
