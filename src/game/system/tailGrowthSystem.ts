import { Location } from '../component/location';
import { Tail } from '../component/tail';
import { World } from '@/ecs/world';
import { Entity } from '@/ecs/entity';
import { ISystem } from '@/ecs/system';
import { createTail } from '../entities/tail';
import { GameConfig } from '../config/game';
import { Attack } from '../component/attack';

export class TailGrowthSystem implements ISystem {
  public readonly requiredComponents = [Tail, Location, Attack];
  public entities: Entity[] = [];
  public world: World | undefined = undefined;

  constructor(private _config: GameConfig) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const attack = entity.get(Attack);

      if (!attack.targets.length) {
        return;
      }
      const headTail = entity.get(Tail);
      const lastSegment = headTail.segments.at(-1) || entity;
      const lastSegmentLocation = lastSegment.get(Location);

      const newSegment = createTail(
        this.world!,
        this._config,
        lastSegmentLocation.position,
        lastSegment
      );

      headTail.segments.push(newSegment);
    });
  }
}
