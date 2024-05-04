import path from 'node:path';

interface IPaths {
  entry: string;
  output: string;
  template: string;
}

const rootPath: string = path.resolve('.');
const sourcePath: string = path.join(rootPath, 'src');
const entryPath: string = path.join(sourcePath, 'index.ts');
const outputPath: string = path.join(rootPath, 'dist');
const publicFilePath: string = path.join(rootPath, 'public');
const templatePath: string = path.join(publicFilePath, 'index.ejs');

const pathConfig: IPaths = {
  entry: entryPath,
  output: outputPath,
  template: templatePath,
};

export default pathConfig;
