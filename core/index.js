const {app, BrowserWindow} = require('electron')
const path = require('path')

  // You have to pass the filename of `widevinecdmadapter` here, it is
  // * `widevinecdmadapter.plugin` on macOS,
  // * `libwidevinecdmadapter.so` on Linux,
  // * `widevinecdmadapter.dll` on Windows.
  app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, './bin/widevinecdmadapter.plugin'));
  // The version of plugin can be got from `chrome://plugins` page in Chrome.
  app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.1008');

  let win = null
  app.on('ready', () => {
    win = new BrowserWindow({
      webPreferences: {
        // The `plugins` have to be enabled.
        plugins: true
      }
    })
    win.loadURL("https://bitmovin.com/demos/drm");

    win.show()
  })
