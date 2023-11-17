import { EnvVariables, WebpackConfiguration } from "./config/build/types/types";
import { buildWebpack } from "./config/build/webpack";
import paths from "./config/paths";

const DEV_MODE = "development";
const PROD_MODE = "production";
const buildMode = process.env.NODE_ENV === DEV_MODE ? DEV_MODE : PROD_MODE;
const isDev = buildMode === DEV_MODE;
const isProd = !isDev;

export default (): WebpackConfiguration => {
  const env: EnvVariables = {
    buildMode,
    isDev,
    isProd,
    paths,
  };

  return buildWebpack(env);
};
