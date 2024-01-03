export class Loop {
  private _update: Function;
  private _display: Function;
  private animateId: any = undefined;
  private _count: number = 0;

  constructor(update: Function, display: Function) {
    this._update = update;
    this._display = display;
  }

  private animate(): void {
    this.animateId = requestAnimationFrame(() => this.animate());

    if (this._count < 5) {
      this._count++;
      return;
    }

    this._count = 0;

    try {
      this._update();
      this._display();
    } catch (e) {
      this.stop();
      console.error("Animate error:", e);
    }
  }

  private isActive(): boolean {
    return this.animateId !== undefined;
  }

  public stop(): void {
    cancelAnimationFrame(this.animateId);
    this.animateId = undefined;
  }

  public start(): void {
    this.animateId = requestAnimationFrame(() => this.animate());
  }

  public toggle(): void {
    if (this.isActive()) {
      this.stop();
    } else {
      this.start();
    }
  }
}
