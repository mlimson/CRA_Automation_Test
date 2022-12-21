const config = {
  preset: 'jest-puppeteer',
    reporters: [
        "default",
        ["jest-html-reporters", {
          "publicPath": "./test-results",
          "filename": "test-results.html",
          "openReport": true
        }]
      ]
};

module.exports = config;