var fps = 32;
var interval = 1000 / fps;
var then: undefined | number = 0;
export class Loop {
  private _update: Function;
  private animateId: any = undefined;
  private _frameCount: number = 0;
  private _lastSecond: number = 0;

  constructor(update: Function) {
    this._update = update;
  }

  private animate(timestamp: number): void {
    this.animateId = requestAnimationFrame(this.animate.bind(this));

    if (then === undefined) then = timestamp;

    const delta = timestamp - then;

    if (delta > interval) {
      then = timestamp - (delta % interval);
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
