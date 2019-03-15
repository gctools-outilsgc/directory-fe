const I18nTranslationWebpackPlugin =
  require('@gctools-components/i18n-translation-webpack-plugin');

module.exports = {
  plugins: [new I18nTranslationWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
          mimetype: 'application/fontwoff',
        },
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ],
  },
};
