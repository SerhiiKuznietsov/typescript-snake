import { DevServerConfiguration, EnvVariables } from "./types/types";

export const buildDevServer = (env: EnvVariables): DevServerConfiguration => {
  if (env.isProd) return;

  return {
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: env.paths.output,
    },
    // watchFiles: ["dist/**/*"],
    open: true,
    hot: true,
    // https: false,
  };
};