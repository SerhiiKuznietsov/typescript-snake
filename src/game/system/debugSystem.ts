import * as dat from 'dat.gui';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { guiConfig } from '../config/GUIConfig';

export class DebugSystem implements ISystem {
  private gui: dat.GUI;
  private folders: Map<number, dat.GUI> = new Map();
  public entities = this.w.newGroup(['DebugFlag']);

  constructor(public w: World) {
    this.gui = new dat.GUI();
  }

  private createFolderForEntity(entity: number): dat.GUI {
    const folder = this.gui.addFolder(`Entity ${entity}`);

    if (this.w.getComponent(entity, 'DebugFlag').isOpen) {
      folder.open();
    }

    this.folders.set(entity, folder);

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
      const config = componentConfig[key];

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
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      if (this.folders.has(entity)) return;

      const entityFolder = this.createFolderForEntity(entity);

      const components = this.w.getComponents(entity);
      components.forEach((component, componentName) => {
        this.addComponentToFolder(entityFolder, componentName, component);
      });
    }

    this.folders.forEach((folder, entity) => {
      if (!this.entities.includes(entity)) {
        this.gui.removeFolder(folder);
        this.folders.delete(entity);
      }
    });
  }
}
