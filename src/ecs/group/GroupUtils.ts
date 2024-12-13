import { ComponentConstructorList } from '../Component';
import { GroupQuery } from './GroupManager';

export type GroupKey = string;

const processArr = (arr: ComponentConstructorList): string =>
  arr
    .map((fn) => fn.name)
    .toSorted()
    .join('|');

export const generateKey = (query: GroupQuery = []): GroupKey => {
  const [has = [], not = []] = query;

  return `${processArr(has)}!${processArr(not)}`;
};
