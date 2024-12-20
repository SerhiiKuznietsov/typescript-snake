import { GroupQuery } from './GroupManager';

export type GroupKey = string;

const processArr = (arr: string[]): string => arr.toSorted().join('|');

export const generateKey = (query: GroupQuery = []): GroupKey => {
  const [has = [], not = []] = query;

  return `${processArr(has)}!${processArr(not)}`;
};
