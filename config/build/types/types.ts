import { Configuration, ModuleOptions } from "webpack";
import type { Configuration as DevServerConf } from "webpack-dev-server";
type Mode = "development" | "production";

interface IEnvPaths {
  entry: string;
  output: string;
  template: string;
}

export interface EnvVariables {
  buildMode: Mode;
  isDev: boolean;
  isProd: boolean;
  paths: IEnvPaths;
}

export type WebpackConfiguration = Configuration;
export type PluginConfiguration = Configuration["plugins"];
export type ResolveConfiguration = Configuration["resolve"];
export type LoaderConfiguration = ModuleOptions["rules"];
export type DevServerConfiguration = DevServerConf | undefined;
