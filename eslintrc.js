module.exports = {
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'prettier/vue',
  ],

  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: false,
        script: true,
        style: true,
        customBlocks: {
          docs: { lang: 'markdown' },
          config: { lang: 'json' },
          module: { lang: 'js' },
          comments: false,
        },
      },
      usePrettierrc: true,
      fileInfoOptions: {
        withNodeModules: false,
      },
    },
  },

  rules: {
    'prettier-vue/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
      },
    ],
  },
};
