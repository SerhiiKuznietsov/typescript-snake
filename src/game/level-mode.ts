import { MapCells } from "./map-cells";
import { UnitManager } from "./unit-manager";

const easyLevel: [string, (map: MapCells, unitList: UnitManager) => void] = [
  "easy",
  (map, unitList) => {
    // map.setSize(20, 20, 20);
    unitList.addUnitByType("Snake");
    unitList.addUnitByType("Food", 3);
  },
];

const mediumLevel: [string, (map: MapCells, unitList: UnitManager) => void] = [
  "medium",
  (map, unitList) => {
    // map.setSize(20, 20, 20);
    unitList.addUnitByType("Snake");
    unitList.addUnitByType("Food");
  },
];

const hardLevel: [string, (map: MapCells, unitList: UnitManager) => void] = [
  "hard",
  (map, unitList) => {
    // map.setSize(20, 20, 20);
    unitList.addUnitByType("Snake");
    unitList.addUnitByType("Food");
  },
];

const impossibleLevel: [
  string,
  (map: MapCells, unitList: UnitManager) => void
] = [
  "impossible",
  (map, unitList) => {
    // map.setSize(20, 20, 20);
    unitList.addUnitByType("Snake");
    unitList.addUnitByType("Food", 300);
  },
];

const levels = new Map<string, (map: MapCells, unitList: UnitManager) => void>([
  easyLevel,
  mediumLevel,
  hardLevel,
  impossibleLevel,
]);

export class LevelMode {
  private _usedLevel: string = "easy";

  public use(name: string) {
    if (!levels.has(name))
      throw new Error("this level name not found with list");

    this._usedLevel = name;
  }

  public getLevelInitHandler(): (map: MapCells, unitList: UnitManager) => void {
    const level = levels.get(this._usedLevel);

    if (!level) {
      throw new Error(`level with name: "${this._usedLevel}" is undefined`);
    }

    return level;
  }
}
