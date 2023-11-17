import { ResolveConfiguration } from "./types/types";

export const buildResolve = (): ResolveConfiguration => {
  return {
    extensions: [".js", ".json", ".ts"],
    // modules: ['node_modules'],
  };
};
