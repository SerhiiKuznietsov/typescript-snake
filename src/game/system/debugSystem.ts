import * as dat from 'dat.gui';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { DebugFlag } from '../component/DebugFlag';
import { guiConfig } from '../config/GUIConfig';

export class DebugSystem implements ISystem {
  private gui: dat.GUI;
  private folders: Map<number, dat.GUI> = new Map();

  public entities = this.w.newGroup([DebugFlag]);

  constructor(public w: World) {
    this.gui = new dat.GUI();
  }

  private createFolderForEntity(entityId: number): dat.GUI {
    const folder = this.gui.addFolder(`Entity ${entityId}`);
    this.folders.set(entityId, folder);

    return folder;
  }

  private addComponentToFolder(
    folder: dat.GUI,
    componentName: string,
    componentData: Record<string, any>
  ): void {
    const componentConfig = guiConfig[componentName];

    if (!componentConfig) {
      console.warn(`No GUI config for component: ${componentName}`);
      return;
    }

    const componentFolder = folder.addFolder(componentName);

    Object.keys(componentData).forEach((key) => {
      const value = componentData[key];
      const config = componentConfig[key];

      if (key === 'id') {
        componentFolder.add({ id: value }, 'id').listen();
        return;
      }

      if (!config) {
        console.warn(`No GUI config for property: ${key} in ${componentName}`);
        return;
      }

      switch (config.type) {
        case 'number':
          componentFolder
            .add(componentData, key, config.min, config.max, config.step)
            .listen();
          break;
        case 'boolean':
          componentFolder.add(componentData, key).listen();
          break;
        case 'string':
          componentFolder.add(componentData, key).listen();
          break;
        case 'color':
          componentFolder.addColor(componentData, key).listen();
          break;
        default:
          console.warn(`Unsupported GUI type: ${config.type}`);
      }
    });
  }

  public update(): void {
    this.entities.forEach((entityId) => {
      if (this.folders.has(entityId)) return;

      const entityFolder = this.createFolderForEntity(entityId);

      const components = this.w.getComponents(entityId);
      components.forEach((component, componentName) => {
        this.addComponentToFolder(entityFolder, componentName, component);
      });
    });

    this.folders.forEach((folder, entityId) => {
      if (!this.entities.includes(entityId)) {
        this.gui.removeFolder(folder);
        this.folders.delete(entityId);
      }
    });
  }
}
