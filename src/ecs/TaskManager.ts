import { EventMap } from './EcsEvents';
import { EventBus } from './EventBus';

export const TaskName = {
  ON_CYCLE_UPDATE: 'ON_CYCLE_UPDATE',
  END_OF_NEXT_CYCLE: 'END_OF_NEXT_CYCLE',
  BEFORE_SYSTEM: 'BEFORE_SYSTEM',
} as const;

export type TaskCondition = keyof typeof TaskName;
type SystemType = string;

interface Task {
  callback: () => void;
  system?: SystemType;
  cycleCount?: number;
}

export class TaskManager {
  private _tasks: Map<TaskCondition, Task[]> = new Map([]);
  private _currentCycle: number = 0;
  private _currentSystem: SystemType | null = null;

  constructor(private _eventBus: EventBus<EventMap>) {}

  public init() {
    [
      TaskName.ON_CYCLE_UPDATE,
      TaskName.END_OF_NEXT_CYCLE,
      TaskName.BEFORE_SYSTEM,
    ].forEach((condition) => this._tasks.set(condition as TaskCondition, []));

    this._eventBus.on('SYSTEM_BEFORE_UPDATED', this.onSystemBeforeUpdate);
    this._eventBus.on('SYSTEM_UPDATED', this.onSystemUpdate);
  }

  private onSystemBeforeUpdate = ({ system }: { system: string }): void => {
    this.setSystem(system);
    this.processBeforeSystem();
  };

  private onSystemUpdate = (): void => {
    this.processCycleUpdate();
    this.setSystem();
  };

  public setSystem(currentSystem: SystemType | null = null): void {
    this._currentSystem = currentSystem;
  }

  public addOnCycleUpdate(callback: () => void): void {
    this.addTask(TaskName.ON_CYCLE_UPDATE, { callback });
  }

  public addEndOfNextCycle(callback: () => void): void {
    this.addTask(TaskName.END_OF_NEXT_CYCLE, {
      callback,
      cycleCount: this._currentCycle + 1,
    });
  }

  public addBeforeSystem(callback: () => void): void {
    const system = this._currentSystem;
    if (!system) {
      throw new Error('Current system is null');
    }

    this.addTask(TaskName.BEFORE_SYSTEM, { callback, system });
  }

  public addTask(condition: TaskCondition, task: Task): void {
    if (condition === TaskName.BEFORE_SYSTEM) {
      const system = this._currentSystem;
      if (!system) {
        throw new Error('Current system is null');
      }

      task.system = system;
    }

    const taskList = this._tasks.get(condition);
    if (!taskList) {
      throw new Error(
        `task list for the "${condition}" type has not been created`
      );
    }

    taskList.push(task);
  }

  private processCondition(
    condition: TaskCondition,
    system?: SystemType
  ): void {
    const taskList = this._tasks.get(condition);
    if (!taskList || taskList.length === 0) return;

    const remainingTasks: Task[] = [];

    for (const task of taskList) {
      if (condition === TaskName.BEFORE_SYSTEM && task.system !== system) {
        remainingTasks.push(task);
        continue;
      }

      if (
        condition === TaskName.END_OF_NEXT_CYCLE &&
        task.cycleCount !== this._currentCycle
      ) {
        remainingTasks.push(task);
        continue;
      }

      task.callback();
    }

    this._tasks.set(condition, remainingTasks);
  }

  public processCycleUpdate(): void {
    this.processCondition(TaskName.ON_CYCLE_UPDATE);
    this.processCondition(TaskName.END_OF_NEXT_CYCLE);
    this._currentCycle++;
  }

  public processBeforeSystem(): void {
    const system = this._currentSystem;
    if (!system) {
      throw new Error('Current system is null');
    }

    this.processCondition(TaskName.BEFORE_SYSTEM, system);
  }

  public clear(): void {
    this._tasks.clear();
    this._currentCycle = 0;
    this._currentSystem = null;

    this._eventBus.off('SYSTEM_BEFORE_UPDATED', this.onSystemBeforeUpdate);
    this._eventBus.off('SYSTEM_UPDATED', this.onSystemUpdate);
  }
}

// export interface ActionMap {
//   AddComponent: {
//     entity: EntityId;
//     component: keyof ComponentMap;
//     componentData?: Partial<ComponentMap[keyof ComponentMap]>;
//   };
//   RemoveComponent: {
//     entity: EntityId;
//     component: keyof ComponentMap;
//   };
// }

// abstract class TaskT<T extends Record<string, any>> {
//   constructor(protected _data: T) {}

//   abstract execute(w: World): void;
// }

// interface IAddComponentTaskData {
//   entity: EntityId;
//   component: keyof ComponentMap;
// }

// class AddComponentTask extends TaskT<IAddComponentTaskData> {
//   constructor(entity: EntityId, component: keyof ComponentMap) {
//     super({ entity, component });
//   }

//   public execute(w: World): void {
//     const { entity, component } = this._data;
//     w.getComponent(entity, component);
//   }
// }

// const world = new World();

// const addTask = new AddComponentTask(1, 'Position');
// addTask.execute(world);
