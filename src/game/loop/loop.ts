export class Loop {
  private animateId: number | undefined = undefined;
  private frameCount: number = 0;
  private lastSecond: number = 0;
  private then: number = 0;
  private interval: number | null;
  private boundAnimate: (timestamp: number) => void;

  constructor(
    private update: (delta: number) => void,
    private updateFPS?: (fps: number) => void,
    fps?: number
  ) {
    this.interval = fps ? 1000 / fps : null;
    this.boundAnimate = this.animate.bind(this);
  }

  private animate(timestamp: number): void {
    this.animateId = requestAnimationFrame(this.boundAnimate);

    if (this.then === 0) this.then = timestamp;

    const delta = timestamp - this.then;

    if (this.interval === null || delta > this.interval) {
      this.then = this.interval
        ? timestamp - (delta % this.interval)
        : timestamp;

      try {
        this.update(Math.floor(delta));
      } catch (e) {
        console.error('Error during update:', e);
        return;
      }

      this.frameCount++;

      if (timestamp >= this.lastSecond + 1000) {
        if (this.updateFPS) {
          this.updateFPS(this.frameCount);
        }
        this.frameCount = 0;
        this.lastSecond = timestamp;
      }
    }
  }

  private isActive(): boolean {
    return this.animateId !== undefined;
  }

  public stop(): void {
    if (this.animateId !== undefined) {
      cancelAnimationFrame(this.animateId);
      this.animateId = undefined;
    }
  }

  public start(): void {
    if (!this.isActive()) {
      this.then = 0;
      this.lastSecond = performance.now();
      this.animateId = requestAnimationFrame(this.boundAnimate);
    }
  }

  public toggle(): void {
    if (this.isActive()) {
      this.stop();
    } else {
      this.start();
    }
  }
}
