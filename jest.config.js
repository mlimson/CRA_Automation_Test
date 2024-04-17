const config = {
  preset: 'jest-puppeteer',
    reporters: [
        "default",
        ["jest-html-reporters", {
          "publicPath": "C:/Users/BFI/Desktop/Myles Limson/Test Results/HANA DEV Server - OS Kernel Updates/CRA",
          "filename": "CRA-RCI-releaser-HANA_DEV_Server_OS_Kernel_Updates.html",
          "openReport": true
        }]
      ]
};

module.exports = config;