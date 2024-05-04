import { EnvVariables, WebpackConfiguration } from './types/types';
import { buildDevServer } from './dev-server';
import { buildResolve } from './resolvers';
import { buildLoaders } from './loaders';
import { buildPlugins } from './plugins';

export const buildWebpack = (env: EnvVariables): WebpackConfiguration => {
  return {
    mode: env.buildMode,
    entry: env.paths.entry,
    output: {
      path: env.paths.output,
      filename: '[name].[contenthash].js',
    },
    devServer: buildDevServer(env),
    devtool: env.isDev ? 'source-map' : false,
    resolve: buildResolve(),
    module: {
      rules: buildLoaders(env),
    },
    plugins: buildPlugins(env),
    optimization: {
      runtimeChunk: 'single',
    },
  };
};
