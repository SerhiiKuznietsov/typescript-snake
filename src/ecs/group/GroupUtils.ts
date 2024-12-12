import { ComponentConstructorList } from '../Component';

export type GroupKey = string;

const processArr = (arr: ComponentConstructorList): string =>
  arr
    .map((fn) => fn.name)
    .toSorted()
    .join('|');

export const generateKey = (
  has: ComponentConstructorList = [],
  not: ComponentConstructorList = []
): GroupKey => `${processArr(has)}!${processArr(not)}`;
