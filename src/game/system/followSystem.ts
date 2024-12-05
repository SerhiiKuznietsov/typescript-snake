import { EntityComponentStorage } from '../../ecs/entityComponentStorage';
import { Location } from '../component/location';
import { Follow } from '../component/follow';
import { Entity } from '@/ecs/entity';
import { ISystem } from '@/ecs/system';

export class FollowSystem implements ISystem {
  public readonly requiredComponents = [Follow, Location];
  public entities: Entity[] = [];

  update(): void {
    this.entities.forEach((entity) => {
      const follow = entity.get(Follow);

      if (!follow.targetEntity.has(Location)) {
        return;
      }

      const targetPosition = follow.targetEntity.get(Location);

      const location = entity.get(Location);
      location.position.setVector(targetPosition.position);
    });
  }
}
