import webpack from 'webpack';

const tsLoader = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader']
};

export function buildLoaders(): webpack.RuleSetRule[] {
  return [
    tsLoader,
    cssLoader
  ];
}
