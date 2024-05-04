import { Mode } from './build/types/types';

export const DEV_MODE = 'development';
export const PROD_MODE = 'production';

export const NODE_ENV: Mode =
  process.env.NODE_ENV === DEV_MODE ? DEV_MODE : PROD_MODE;
export const isDev: boolean = NODE_ENV === DEV_MODE;
export const isProd: boolean = !isDev;
