import { Health } from '../component/health';
import { TakeDamage } from '../component/takeDamage';
import { System } from './system';

export class HealthSystem extends System {
  public update(): void {
    this._entities.forEach((entity) => {
      const health = entity.get(Health);

      if (!health.current) return;

      if (!entity.has(TakeDamage)) return;

      const takeDamage = entity.get(TakeDamage);

      if (!takeDamage.damageReceived) return;

      health.current -= takeDamage.damageReceived;
    });
  }
}
