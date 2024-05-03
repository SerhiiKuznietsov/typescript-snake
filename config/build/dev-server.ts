import { DevServerConfiguration, EnvVariables } from "./types/types";

export const buildDevServer = (env: EnvVariables): DevServerConfiguration => {
  if (env.isProd) return;

  return {
    devMiddleware: {
      writeToDisk: true,
    },
    port: env.port,
    hot: true,
    liveReload: true,
  };
};