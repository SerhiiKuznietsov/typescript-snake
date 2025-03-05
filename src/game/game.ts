import { Loop } from './loop/loop';
import { Board } from './board';
import { GameConfig } from './config/game';
import { World } from '../ecs/World';
import { SystemRegistry } from '../ecs/SystemRegistry';
import { GridManager } from './managers/GridManager';
import { InputManager } from './managers/InputManager';
import { GameStateManager } from './managers/GameStateManager/GameStateManager';
import { StartState } from './managers/GameStateManager/states/start';
import { PlayState } from './managers/GameStateManager/states/play';
import { PauseState } from './managers/GameStateManager/states/pause';
import { LoseState } from './managers/GameStateManager/states/lose';
import { WinState } from './managers/GameStateManager/states/win';
import { ClearState } from './managers/GameStateManager/states/clear';
import { InitState } from './managers/GameStateManager/states/init';
export class Game {
  public config = new GameConfig();
  public board = new Board(
    '.game__body',
    this.config.boardWidth,
    this.config.boardHeight
  );
  public gridManager = new GridManager();
  public inputManager = new InputManager();
  public world = new World();
  public systems = new SystemRegistry(this.world);
  public gameStateManager: GameStateManager;
  public loop: Loop;
  private _fpsElement = document.querySelector('.game__fps') as Element;

  constructor() {
    this.gameStateManager = new GameStateManager([
      new InitState(this),
      new StartState(this),
      new PlayState(this),
      new PauseState(),
      new WinState(this),
      new LoseState(this),
      new ClearState(this),
    ]);

    this.loop = new Loop(
      this.gameStateManager.update.bind(this.gameStateManager),
      (fps: number = 0) => (this._fpsElement.textContent = `${fps}`)
    );

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'Enter':
          this.gameStateManager.changeState(PlayState.name);
          break;
        case 'L':
          this.gameStateManager.changeState(LoseState.name);
          break;
        case 'W':
          this.gameStateManager.changeState(WinState.name);
          break;
        case 'S':
          this.gameStateManager.changeState(StartState.name);
          break;
        case 'C':
          this.gameStateManager.changeState(ClearState.name);
          break;
        case 'R':
          this.gameStateManager.changeState(WinState.name);
          this.gameStateManager.changeState(ClearState.name);
          this.gameStateManager.changeState(StartState.name);

          break;
      }
    });
  }

  public init(): void {
    this.gameStateManager.init(InitState.name);
  }

  public pauseHandler = () => {
    if (this.gameStateManager.currentState === PauseState.name) {
      this.gameStateManager.changeState(PlayState.name);
      return;
    }

    if (this.gameStateManager.currentState === PlayState.name) {
      this.gameStateManager.changeState(PauseState.name);
      return;
    }
  };
}
