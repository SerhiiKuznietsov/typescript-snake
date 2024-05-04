import { Health } from '../component/health';
import { System } from './system';

export class HealthSystem extends System {
  public update(): void {
    this._entities.forEach((entity) => {
      const health = entity.get(Health);

      if (health.isAlive) return;
    });
  }
}
