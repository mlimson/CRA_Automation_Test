const config = {
  preset: 'jest-puppeteer',
    reporters: [
        "default",
        ["jest-html-reporters", {
          "publicPath": "./test-results",
          "filename": "CRA-node18-test-accounting.html",
          "openReport": true
        }]
      ]
};

module.exports = config;