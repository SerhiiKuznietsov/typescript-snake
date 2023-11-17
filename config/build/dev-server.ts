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
    // compress: true,
    // client: {
    //   overlay: {
    //     errors: true,
    //     warnings: true,
    //     runtimeErrors: true,
    //   },
    //   progress: true,
    //   logging: "info",
    // },
    // hot: true,
    // https: false,
  };
};