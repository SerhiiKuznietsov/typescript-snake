import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { EnvVariables, LoaderConfiguration } from './types/types';

export const buildLoaders = (env: EnvVariables): LoaderConfiguration => {
  const cssLoader = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      env.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          // localIdentName: env.isDev ? "[path][name]__[local]" : "[hash:base64:8]",
        },
      },
    ],
  };

  const babelLoader = {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  };

  const tsLoader = {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: {
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          transpileOnly: true,
          configFile: './tsconfig.json',
        },
      },
    },
  };

  return [cssLoader, babelLoader, tsLoader];
};
