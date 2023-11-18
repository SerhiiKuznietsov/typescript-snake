import { EnvVariables, Mode, WebpackConfiguration } from "./config/build/types/types";
import { buildWebpack } from "./config/build/webpack";
import paths from "./config/paths";

const DEV_MODE = "development";
const PROD_MODE = "production";
const buildMode: Mode = process.env.NODE_ENV === DEV_MODE ? DEV_MODE : PROD_MODE;
const isDev: boolean = buildMode === DEV_MODE;
const isProd: boolean = !isDev;

export default (): WebpackConfiguration => {
  const env: EnvVariables = {
    buildMode,
    isDev,
    isProd,
    paths,
  };

  return buildWebpack(env);
};
