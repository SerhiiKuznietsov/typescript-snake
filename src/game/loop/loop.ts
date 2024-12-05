export class Loop {
  private animateId: any = undefined;
  private _frameCount: number = 0;
  private _lastSecond: number = 0;
  private _then: undefined | number = 0;
  private _interval: number;

  constructor(private _update: Function, fps: number = 32) {
    this._interval = 1000 / fps;
  }

  private animate(timestamp: number): void {
    this.animateId = requestAnimationFrame(this.animate.bind(this));

    if (this._then === undefined) this._then = timestamp;

    const delta = timestamp - this._then;

    if (delta > this._interval) {
      this._then = timestamp - (delta % this._interval);
    } else {
      return;
    }

    this._frameCount++;

    if (timestamp >= this._lastSecond + 1000) {
      console.log(`Current FPS: ${this._frameCount}`);

      this._frameCount = 0;
      this._lastSecond = timestamp - (timestamp - this._lastSecond - 1000);
    }

    try {
      this._update(Math.floor(delta));
    } catch (e) {
      this.stop();
      console.error('Animate error:', e);
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
    this.animateId = requestAnimationFrame(this.animate.bind(this));
  }

  public toggle(): void {
    if (this.isActive()) {
      this.stop();
    } else {
      this.start();
    }
  }
}
