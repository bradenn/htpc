// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    webPreferences: {
      plugins: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('spotify.html')
//mainWindow.loadURL("https://bitmovin.com/demos/drm");
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  globalShortcut.register('Control+X', () => {
      mainWindow.loadFile('index.html')
    })
  globalShortcut.register('Control+V', () => {
      mainWindow.loadURL('https://bitmovin.com/demos/drm')
    })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('widevine-ready', (version, lastVersion) => {
  if (null !== lastVersion) {
    console.log('Widevine ' + version + ', upgraded from ' + lastVersion + ', is ready to be used!');
  } else {
    console.log('Widevine ' + version + ' is ready to be used!');
  }
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
