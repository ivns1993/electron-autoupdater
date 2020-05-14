const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let mainWindow;
let isUpdateInProgress = false;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

app.on('ready', () => {
  createWindow();
  setInterval(() => {
    if (!isUpdateInProgress) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  }, 5000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function sendStatusToWindow(text) {
  log.info(text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking if update is started...');
});

autoUpdater.on('update-available', () => {
  isUpdateInProgress = true;
});

autoUpdater.on('update-not-available', () => {
  sendStatusToWindow('Update not available...');
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('Update downloaded');
  autoUpdater.quitAndInstall();
});

ipcMain.on('app_version', event => event.sender.send('app_version', { version: app.getVersion() }));