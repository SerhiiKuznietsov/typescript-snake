export const EcsEvents = {
  ENTITY_CREATED: 'EntityCreated',
  ENTITY_DELETED: 'EntityDeleted',
  COMPONENT_ADDED: 'ComponentAdded',
  COMPONENT_REMOVED: 'ComponentRemoved',
  SYSTEM_ADDED: 'SystemAdded',
  SYSTEM_REMOVED: 'SystemRemoved',
} as const;

export type EcsEventName = keyof typeof EcsEvents;
