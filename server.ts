import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpack.config";

const config = webpackConfig();
const compiler = webpack(config);
const server = new webpackDevServer({ ...config.devServer }, compiler);

(async () => {
  console.log("Starting server...");
  await server.start();
})();
