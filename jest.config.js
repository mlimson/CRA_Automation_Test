const config = {
  preset: 'jest-puppeteer',
    reporters: [
        "default",
        ["jest-html-reporters", {
          "publicPath": "C:/Users/BFI ITG/Desktop/Automation Tests/CRA/CRA_Automation_Test/reports",
          "filename": "OrigDev_CRA_Accounting.html",
          "openReport": true
        }]
      ]
};

module.exports = config;