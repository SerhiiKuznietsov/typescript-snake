import { IComponent } from '../../ecs/component';

export class Respawn implements IComponent {
  public readonly respawnTime: number;
  public remainingTime: number = 0;
  public readyToRespawn = false;

  constructor(readonly id: number, respawnTime: number = 1) {
    this.respawnTime = respawnTime * 1000;
  }
}
