export class Health {
  public readonly maxHealth: number;
  public current: number;

  constructor(maxHealth: number = 1) {
    this.maxHealth = maxHealth;
    this.current = maxHealth;
  }
}
