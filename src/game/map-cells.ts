import { UnitManager } from "./unit-manager";
import { Cell } from "./cell";
import { createId } from "./utils/id";
import { range } from "./utils/random";
import { Game } from "./game";
import { GameConfig } from "./config/game";

export class MapCells {
  private _xGridsCount: number;
  private _yGridsCount: number;
  private _gridSize: number;
  private _cells = new Map();

  constructor(config: GameConfig) {
    this._xGridsCount = config.xGridsCount;
    this._yGridsCount = config.xGridsCount;
    this._gridSize = config.gridSize;
  }

  public getCell(x: number, y: number): Cell {
    x = this.getConfirmed(x, this._xGridsCount);
    y = this.getConfirmed(y, this._yGridsCount);

    const id = createId(x, y);

    if (!this._cells.has(id)) throw new Error(`cell with id ${id} not found`);

    return this._cells.get(id);
  }

  public getConfirmed(num: number, maxNum: number): number {
    if (num < 0) return maxNum - 1;
    if (num > maxNum - 1) return 0;

    return num;
  }

  public getRandomCell(): Cell {
    const x = range(0, this._xGridsCount);
    const y = range(0, this._yGridsCount);

    const cell = this.getCell(x, y);

    if (cell.isEmpty()) return cell;

    return this.getRandomCell();
  }

  public init() {
    for (let y = 0; y < this._yGridsCount; y++) {
      for (let x = 0; x < this._xGridsCount; x++) {
        this.createCell(x, y);
      }
    }
  }

  public clear() {
    this._cells.clear();
  }

  private createCell(x: number, y: number) {
    const id = createId(x, y);

    if (this._cells.has(id)) throw new Error(`id: "${id}" already exists`);

    this._cells.set(id, new Cell(x, y, this._gridSize));
  }

  public draw() {
    // this.cells.forEach((cell) => {
    //   this.board.draw(...cell.getSize());
    // });
  }
}
