import { PORT as port } from "./config/server";
import { EnvVariables, WebpackConfiguration } from "./config/build/types/types";
import { buildWebpack } from "./config/build/webpack";
import paths from "./config/paths";
import { isDev, isProd, NODE_ENV as buildMode } from "./config/app";

export default (): WebpackConfiguration => {
  const env: EnvVariables = {
    buildMode,
    isDev,
    isProd,
    isAnalyzer: false,
    port,
    paths,
  };

  return buildWebpack(env);
};
