/**
 * Created by QiHan Wang on 2018/1/12.
 * E-Mail: whenhan@foxmail.com
 * File Name: css-rule
 */
const autoprefixer = require('autoprefixer');
const paths = require('./paths');

const postCss = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
};

const cssLoader = (modules) => {
  const baseOptions = {importLoaders: 1,};
  const cssOptions = modules ? {
    ...baseOptions,
    modules: true,
    localIdentName: '[local]--[hash:base64:8]'
  } : baseOptions;

  return [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
  ]
};

module.exports = {
  ruleCssModules: {
    test: /\.s?css$/,
    include: paths.appSrc,
    exclude: paths.appSrc + 'index.scss',
    use: [
      ...cssLoader(true),
      postCss,
      require.resolve('sass-loader'),
    ],
  },
  ruleNoCssModules: {
    test: /\.s?css$/,
    include: paths.appNodeModules,
    use: [
      ...cssLoader(),
      postCss
    ],
  },
}
