export class Loop {
  private animateId: any = undefined;
  private count: number = 0;

  constructor(
    private handlers: Array<Function>,
  ) {}

  public start(): void {
    this.animateId = requestAnimationFrame(() => this.animate());
  }

  public stop(): void {
    cancelAnimationFrame(this.animateId);
    this.animateId = undefined;
  }

  private animate(): void | number {
    this.animateId = requestAnimationFrame(() => this.animate());

    if (this.count < 4) return this.count++;
    this.count = 0;

    try {
      this.handlers.forEach(fn => fn());
    } catch (e) {
      this.stop();
      console.error(e);
    }
  }
}