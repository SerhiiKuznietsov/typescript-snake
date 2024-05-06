import { Observable } from './observable';
import { EntityObserverDataType } from './type';

class EntityComponentObserver extends Observable<EntityObserverDataType> {}

export const entityComponentObserver = new EntityComponentObserver();
