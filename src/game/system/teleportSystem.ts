import { Location } from '../component/location';
import { Teleport } from '../component/teleport';
import { GameConfig } from '../config/game';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class TeleportSystem implements ISystem {
  public entities: EntityId[] = [];

  constructor(private _config: GameConfig, public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [Teleport, Location]);
  }

  public update(): void {
    this.entities.forEach((entity) => {
      this.teleportationCheck(entity);
    });
  }

  private teleportationCheck(entity: EntityId) {
    const location = this.w.getComponent(entity, Location);
    const teleport = this.w.getComponent(entity, Teleport);

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
