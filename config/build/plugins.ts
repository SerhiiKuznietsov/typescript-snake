import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { EnvVariables, PluginConfiguration } from "./types/types";

export const buildPlugins = (env: EnvVariables): PluginConfiguration => {
  const plugins: PluginConfiguration = [
    new HtmlWebpackPlugin({
      filename: "index.[contenthash].html",
      template: env.paths.template,
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
      },
      title: env.isDev ? "Development" : "Snake game",
      // logo: path.basename(globalEnv.app.logo),
    }),
    new CleanWebpackPlugin(),
  ];

  if (env.isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new BundleAnalyzerPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  return plugins;
};
