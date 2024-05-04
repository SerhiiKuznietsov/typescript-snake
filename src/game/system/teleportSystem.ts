import { Location } from '../component/location';
import { Teleport } from '../component/teleport';
import { GameConfig } from '../config/game';
import { Entity } from '../entity/entity';
import { System } from './system';

export class TeleportSystem extends System {
  private _config: GameConfig;

  constructor(config: GameConfig) {
    super();
    this._config = config;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      this.teleportationCheck(entity);
    });
  }

  private teleportationCheck(entity: Entity) {
    const location = entity.get(Location);
    const teleport = entity.get(Teleport);

    if (!teleport.isActive) return;

    if (location.position.x > this._config.xGridsCount - 1) {
      location.position.setX(0);
      return;
    }

    if (location.position.x < 0) {
      location.position.setX(this._config.xGridsCount - 1);
      return;
    }

    if (location.position.y > this._config.yGridsCount - 1) {
      location.position.setY(0);
      return;
    }

    if (location.position.y < 0) {
      location.position.setY(this._config.yGridsCount - 1);
      return;
    }
  }
}
