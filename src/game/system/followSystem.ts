// import { EntityComponentStorage } from '@/ecs/EntityComponentStorage';
// import { Location } from '../component/location';
// import { Follow } from '../component/follow';
// import { Entity } from '@/ecs/entity';
// import { ISystem } from '@/ecs/system';

// export class FollowSystem implements ISystem {
//   public readonly requiredComponents = [Follow, Location];
//   public entities: Entity[] = [];

//   update(): void {
//     this.entities.forEach((entity) => {
//       const follow = this.w.getComponent(entity, Follow);

//       if (!follow.targetEntity.has(Location)) {
//         return;
//       }

//       const targetPosition = follow.targetEntity.get(Location);

//       const location = this.w.getComponent(entity, Location);
//       location.position.setVector(targetPosition.position);
//     });
//   }
// }
