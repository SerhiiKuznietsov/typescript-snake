export class Health {
  public readonly maxHealth: number;
  public current: number;
  public isAlive: boolean = true;

  constructor(maxHealth: number = 1) {
    this.maxHealth = maxHealth;
    this.current = maxHealth;
    this.isAlive = !!maxHealth;
  }
}
