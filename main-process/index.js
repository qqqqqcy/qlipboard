// Modules to control application life and create native browser window
const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut,
} = require('electron');
const robot = require('robotjs');
const fs = require('fs');
const path = require('path');
const { setWinOnActiveScreen } = require('./utils/screenHelper');
const { ClipboardEx } = require('./utils/clipboardHelper');
const { registerShortCut, unregisterShortCut } = require('./utils/globShortcutHelper');

const APP_DATA_PATH = path.join(app.getAppPath('appData'), '.appData');
if (!fs.existsSync(APP_DATA_PATH)) {
  fs.mkdirSync(APP_DATA_PATH);
}

function createWin() {
  const mainWindow = new BrowserWindow({
    title: 'QLIP BOARD',
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setAlwaysOnTop(true);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.loadURL('http://localhost:8080/');
  return mainWindow;
}

function hideWin(win) {
  win.hide();
  unregisterShortCut();
}

app.whenReady().then(() => {
  const win = createWin();
  const clipboardEx = new ClipboardEx({ dataPath: APP_DATA_PATH });

  win.once('ready-to-show', () => {
    globalShortcut.register('Command+Shift+V', () => {
      win.send('copyListUpdate', clipboardEx.orderCopyList);

      // TODO 日志
      // fs.writeFileSync(path.join(__dirname, 'log.js'), JSON.stringify(clipboardEx.orderCopyList));

      setWinOnActiveScreen(win);
      win.showInactive();

      registerShortCut(win);

      globalShortcut.register('Esc', () => {
        hideWin(win);
      });
    });
  });

  // 测试用
  globalShortcut.register('Command+Shift+B', () => {
    clipboardEx.clearClipboard();
  });

  ipcMain.on('selectedItem', (_event, index) => {
    clipboardEx.handlerItemByOrderIndex(index);
    hideWin(win);
    robot.keyTap('v', ['command']);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
