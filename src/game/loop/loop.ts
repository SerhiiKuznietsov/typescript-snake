export class Loop {
  private _running = false;
  private _frameCount = 0;
  private _lastSecond = 0;
  private _then = 0;
  private _interval: number | null;
  private _boundAnimate: (timestamp: number) => void = this.animate.bind(this);

  constructor(
    private update: (delta: number) => void,
    private updateFPS?: (fps: number) => void,
    fps?: number
  ) {
    this._interval = fps ? 1000 / fps : null;
  }

  private animate(timestamp: number): void {
    if (!this._running) return;

    requestAnimationFrame(this._boundAnimate);

    if (this._then === 0) this._then = timestamp;

    const delta = timestamp - this._then;

    if (this._interval === null || delta >= this._interval) {
      this._then = timestamp - (this._interval ? delta % this._interval : 0);

      try {
        this.update(delta);
      } catch (e) {
        console.error('Error during update:', e);
        return;
      }

      this._frameCount++;

      if (timestamp - this._lastSecond >= 1000) {
        this.updateFPS?.(this._frameCount);
        this._frameCount = 0;
        this._lastSecond = timestamp;
      }
    }
  }

  public start(): void {
    if (this._running) return;

    this._running = true;
    this._then = performance.now();
    this._lastSecond = this._then;
    requestAnimationFrame(this._boundAnimate);
  }

  public stop(): void {
    this._running = false;
  }

  public toggle(): void {
    this._running ? this.stop() : this.start();
  }
}
