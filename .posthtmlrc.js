module.exports = {
  plugins: {
    'posthtml-favicons': {
      root: 'src',
      configuration: {
        path: '/',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    },
  },
}
