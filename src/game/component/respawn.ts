import { IComponent } from '../../ecs/component';

export class Respawn implements IComponent {
  public respawnTime: number;
  public remainingTime: number = 0;
  public readyToRespawn = false;

  constructor(readonly id: number, respawnTime: number = 0.3) {
    this.respawnTime = respawnTime * 1000;
  }
}
