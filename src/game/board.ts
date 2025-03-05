import { Vector2 } from './geometry/vector2';

export class Board {
  private _parentElement: Element;
  private _element: HTMLCanvasElement;
  public readonly _context: CanvasRenderingContext2D;

  constructor(
    parentElementSelector: string,
    private _width: number,
    private _height: number,
    selector: string = 'gameBoard',
  ) {
    this._parentElement = document.querySelector(
      parentElementSelector
    ) as Element;

    if (!this._parentElement)
      throw new Error(
        `Board error. Parent element with selector "${parentElementSelector}" not found.`
      );

    this._element = <HTMLCanvasElement>document.createElement('canvas');
    this._element.id = selector;
    this._context = this._element.getContext('2d') as CanvasRenderingContext2D;
  }

  public init(): Board {
    this._element.width = this._width;
    this._element.height = this._height;

    this._parentElement.appendChild(this._element);

    return this;
  }

  public draw({ x, y }: Vector2, size: number, color: string): void {
    this._context.fillStyle = color;
    this._context.fillRect(x * size, y * size, size, size);
  }

  public drawText(
    text: string,
    fontSize: number = 30,
    color: string = 'white',
    fontFamily: string = 'Arial'
  ): void {
    const ctx = this._context;
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const x = this._width / 2;
    const y = this._height / 2;

    ctx.fillText(text, x, y);
  }

  public clear({ x, y }: Vector2, gridSize: number = 20) {
    this._context.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);
  }

  public clearBoard() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  public destroy(): void {
    this._parentElement.removeChild(this._element);
  }
}
