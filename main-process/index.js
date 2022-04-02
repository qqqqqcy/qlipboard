// Modules to control application life and create native browser window
const {
  app,
  Tray,
  Menu,
  ipcMain,
  BrowserWindow,
  globalShortcut,
} = require('electron');
const robot = require('robotjs');
const path = require('path');
const { setWinOnActiveScreen } = require('./utils/screenHelper');
const { ClipboardEx } = require('./utils/clipboardHelper');
const { registerShortCut, unregisterShortCut } = require('./utils/globShortcutHelper');

let tray = null;

const APP_DATA_PATH = path.join(app.getAppPath('appData'), '.appData');
// if (!fs.existsSync(APP_DATA_PATH)) {
//   fs.mkdirSync(APP_DATA_PATH);
// }

function createWin() {
  const mainWindow = new BrowserWindow({
    title: 'QLIP BOARD',
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  });

  mainWindow.setAlwaysOnTop(true);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  if (process.argv.includes('--dev')) {
    mainWindow.loadURL('http://localhost:8080/');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
  return mainWindow;
}

function hideWin(win) {
  win.hide();
  unregisterShortCut();
}

app.whenReady().then(() => {
  const win = createWin();
  const clipboardEx = new ClipboardEx({ dataPath: APP_DATA_PATH });

  function showQlipboard() {
    win.send('copyListUpdate', clipboardEx.orderCopyList);
    // TODO 日志
    // fs.writeFileSync(path.join(__dirname, 'log.js'), JSON.stringify(clipboardEx.orderCopyList));
    setWinOnActiveScreen(win);
    win.showInactive();
    registerShortCut(win);
    globalShortcut.register('Esc', () => {
      hideWin(win);
    });
  }

  win.once('ready-to-show', () => {
    globalShortcut.register('Command+Shift+V', () => {
      showQlipboard();
    });
  });

  if (process.platform === 'darwin') {
    tray = new Tray(path.join(__dirname, 'assets/iconTemplate.png'));
  } else if (process.platform === 'linux') {
    // tray = new Tray(path.join(__dirname, 'img', 'iconTemplate@2x.png'));
  } else {
    // tray = new Tray(path.join(__dirname, 'img', 'iconTemplate.png'));
  }
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Qlipboard',
      click() {
        showQlipboard();
      },
    },
    {
      label: 'Hide Qlipboard',
      click() {
        hideWin(win);
      },
    },
    {
      label: 'Clear History',
      click() {
        clipboardEx.clearClipboard();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit Qlipboard',
      click() {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Olden');
  tray.setContextMenu(contextMenu);

  ipcMain.on('selectedItem', (_event, index) => {
    clipboardEx.handlerItemByOrderIndex(index);
    hideWin(win);
    robot.keyTap('v', ['command']);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
