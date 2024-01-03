import { KeyControl } from "./key-control";
import { MapCells } from "./map-cells";
import { Loop } from "./loop/loop";
import { GameStateController } from "./stateControllers/gameStateController";
import { gameObserver } from "./observable/gameEvent";
import { gameStateObserver } from "./observable/gameState";
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from "./stateControllers/type/type";
import { Board } from "./board";
import { GameConfig } from "./config/game";
import { LevelMode } from "./level-mode";
import { UnitManager } from "./unit-manager";

export class Game {
  private _resetBtn = new KeyControl(
    document.querySelector(".reset__btn"),
    "click",
    this.restart.bind(this)
  );
  private _levelSelect = new KeyControl(
    document.querySelector(".level__list"),
    "change",
    this.changeLevelHandler.bind(this)
  );
  private _pauseControl = new KeyControl<KeyboardEvent>(
    document,
    "keydown",
    (e) => {
      if (e.keyCode !== 32) return;
      this.pause();
    }
  );

  private _config = new GameConfig();
  private _stateController = new GameStateController();
  private _loop = new Loop(this.update.bind(this), this.display.bind(this));
  private _board = new Board(".game__body", "gameBoard", this._config);
  public _map = new MapCells(this._config);
  private _levelMode = new LevelMode();
  private _unitManager = new UnitManager(this);

  private update(): void {
    this._unitManager.moveEntity();
  }

  private display(): void {
    this._board.clear();
    this._map.draw();
    this._unitManager.draw(this._board._context);
  }

  public init(): Game {
    this._board.init();
    this._pauseControl.on();
    this._resetBtn.on();
    this._levelSelect.on();

    gameObserver.attach((stateName) => {
      if (stateName === this._stateController.getActive().name) return;

      throw new Error(
        "State change notification bypasses game state change logic"
      );
    });

    gameStateObserver.attach(this.observerHandler.bind(this));

    gameStateObserver.notify(GameAction.toReadyToStart);

    return this;
  }

  private observerHandler(actionName: GameActionNameType) {
    console.log("Action", actionName);

    console.log("ActiveState", this._stateController.getActive().name);

    const newState = this._stateController.changeByActionThrowable(actionName);

    console.log("newState", newState);

    gameObserver.notify(newState);

    if (newState === GameStateList.restart) {
      gameStateObserver.notify(GameAction.toReadyToStart);
    }

    if (newState === GameStateList.lose) {
      this.over();
    }

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }
  }

  private changeLevelHandler(e: Event) {
    this.restart();
  }

  public start(): Game {
    // const value = this._levelSelect.getValue();
    const value = "easy";
    this._levelMode.use(value);
    this._levelMode.getLevelInitHandler()(this._map, this._unitManager);
    this._map.init();
    this._unitManager.init();
    this._loop.start();

    gameStateObserver.notify(GameAction.toStart);
    return this;
  }

  private clear(): void {
    this._board.clear();
    this._loop.stop();
    this._map.clear();
    this._map.draw();
    this._unitManager.clear();
  }

  private over(): void {
    this._pauseControl.off();
    this._loop.stop();
    this._board.fillText("GAME OVER!", "black", "50px MV Boli");
  }

  private pause(): void {
    this._loop.toggle();
  }

  private restart(): void {
    this.clear();
    gameStateObserver.notify(GameAction.toRestart);
    this.start();
  }
}
