import { GameActionNameType } from "../stateControllers/type/type";
import { Observable } from "./observable";

class GameStateObserver extends Observable<GameActionNameType> {}

export const gameStateObserver = new GameStateObserver();
