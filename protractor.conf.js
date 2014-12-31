exports.config = {
  capabilities: {
    browserName: 'firefox'
  },

  onPrepare: './test/e2e/init.js',

  framework: 'mocha',
  specs: [
    'test/e2e/**/*.spec.js'
  ],

  mochaOpts: {
    enableTimeouts: false
  }
}
