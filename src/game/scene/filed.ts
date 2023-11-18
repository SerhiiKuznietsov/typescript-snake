export class Field {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _parentElement: HTMLElement;

  constructor(parentSelector: string = '#root') {
    this._parentElement = document.querySelector(parentSelector) as HTMLElement;

    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;

    this._canvas.id = 'root';
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    this._parentElement.append(this._canvas);
  }

  public init() {

  }
}