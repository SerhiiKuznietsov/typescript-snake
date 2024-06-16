import { IComponentConstructor, IComponent } from './component';
import { Entity } from './entity';
import { World } from './world';

export type UpdateSystemData = { entities: Entity[]; deltaTime: number };

export interface ISystem {
  requiredComponents?: IComponentConstructor<IComponent>[];
  excludedComponents?: IComponentConstructor<IComponent>[];
  entities: Entity[];
  world?: World;
  update(data: UpdateSystemData): void;
}
