export class Respawn {
  public readonly respawnTime: number;
  public remainingTime: number = 0;
  public readyToRespawn = false;

  constructor(respawnTime: number = 1) {
    this.respawnTime = respawnTime * 1000;
  }
}
