import { Loop } from "./loop";

export class LoopController {
  private loop: Loop;
  private isActive: boolean = false;

  constructor(arr: Array<Function>) {
    this.loop = new Loop(arr);
  }

  public start(): void {
    this.loop.start();
    this.isActive = true;
  }

  public stop(): void {
    this.loop.stop();
    this.isActive = false;
  }

  public toggle(): void {
    if (this.isActive) {
      this.stop();
    } else {
      this.start();
    }
  }
}