// Modules to control application life and create native browser window
const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut,
} = require('electron');

const path = require('path');
const { setWinOnActiveScreen } = require('./utils/screenHelper');
const { ClipboardEx } = require('./utils/clipboardHelper');

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

const GLOBAL_SHORTCUT_KEY = ['Up', 'Down', 'Esc', 'Return'];

function hideWin(win) {
  win.hide();
  GLOBAL_SHORTCUT_KEY.forEach((item) => globalShortcut.unregister(item));
}

app.whenReady().then(() => {
  const win = createWin();
  const clipboardEx = new ClipboardEx();

  win.once('ready-to-show', () => {
    globalShortcut.register('Command+Shift+V', () => {
      win.send('copyListUpdate', clipboardEx.orderCopyList);
      setWinOnActiveScreen(win);
      win.showInactive();

      globalShortcut.register('Up', () => {
        win.send('changeActiveIdx', -1);
      });
      globalShortcut.register('Down', () => {
        win.send('changeActiveIdx', 1);
      });
      globalShortcut.register('Return', () => {
        win.send('changeActiveIdx', 0);
      });
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
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
