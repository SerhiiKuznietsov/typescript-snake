import { ComponentMap } from '@/game/component/components';
import { EntityId } from './Entity';

export interface EventMap {
  COMPONENT_ADDED: { entity: EntityId; componentName: keyof ComponentMap };
  COMPONENT_REMOVED: { entity: EntityId; componentName: keyof ComponentMap };
  SYSTEM_ADDED: { system: string };
  SYSTEM_DESTROYED: { system: string };
  SYSTEM_BEFORE_UPDATED: { system: string };
  SYSTEM_UPDATED: { system: string };
}
