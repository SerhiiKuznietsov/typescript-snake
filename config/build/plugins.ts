import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { EnvVariables, PluginConfiguration } from "./types/types";

export const buildPlugins = (env: EnvVariables): PluginConfiguration => {
  const plugins: PluginConfiguration = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html", // TODO - index.[contenthash].html
      template: env.paths.template,
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
      },
      title: env.isDev ? "Development" : "Snake game",
      // TODO - logo: path.basename(globalEnv.app.logo),
    }),
  ];

  if (env.isAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (env.isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  return plugins;
};
