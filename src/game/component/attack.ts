import { Entity } from '../entity/entity';

export class Attack {
  constructor(public targets: Entity[] = []) {}
}
