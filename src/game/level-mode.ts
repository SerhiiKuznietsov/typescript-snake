import { GameConfig } from "./config/game";

export class LevelMode {
  private _usedLevel: string = "easy";

  public use(name: string): LevelMode {
    // if (!levels.has(name))
    //   throw new Error("this level name not found with list");

    this._usedLevel = name;

    return this;
  }

  public getConfig(): GameConfig {
    if (this._usedLevel === "easy") {
      return new GameConfig();
    }

    if (this._usedLevel === "medium") {
      return new GameConfig();
    }

    if (this._usedLevel === "hard") {
      return new GameConfig();
    }

    if (this._usedLevel === "impossible") {
      return new GameConfig();
    }

    return new GameConfig();
  }
}
