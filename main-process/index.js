// Modules to control application life and create native browser window
const {
  app,
  ipcMain,
  clipboard,
  BrowserWindow,
  globalShortcut,
} = require('electron');

const robot = require('robotjs');
const Store = require('electron-store');
const path = require('path');
const { setWinOnActiveScreen } = require('./utils/screenHelper');

function createWin() {
  const mainWindow = new BrowserWindow({
    title: 'QLIP BOARD',
    frame: false,
    show: false,
    transparent: true,
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
  ['Up', 'Down', 'Esc', 'Return'].forEach((item) => globalShortcut.unregister(item));
}

app.whenReady().then(() => {
  const store = new Store();
  const win = createWin();

  let copyList = store.get('copyList') || [];
  let currentItem = copyList[copyList.length - 1];

  win.once('ready-to-show', () => {
    globalShortcut.register('Command+Shift+V', () => {
      win.send('copyListUpdate', copyList);
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

  ipcMain.on('selectedItem', (_event, index) => {
    const item = copyList[copyList.length - 1 - index];
    // 防止重复
    if (item.imgNative) {
      clipboard.writeImage(item.imgNative);
    } else {
      clipboard.writeText(item.text);
    }
    currentItem = item;
    robot.keyTap('v', ['command']);
    hideWin(win);
    //   robot.typeString(item.text);
    // robot.keyTap('v', ['command', 'shift']);
    // }
  });
  setInterval(() => {
    // TODO 文件
    // TODO 去重
    const text = clipboard.readText();
    const html = clipboard.readHTML();
    if (
      (currentItem.text || text)
        ? currentItem.text !== text
        : (currentItem.html !== html) && html
    ) {
      // 过滤出图片
      const item = {
        text,
        html,
      };
      if ((/^<meta charset='.+'><img src="(.+)"\/>$/.exec(html))?.[1]) {
        // TODO
        item.img = clipboard.readImage().toDataURL();
        item.imgNative = clipboard.readImage();
      }
      currentItem = item;
      copyList.push(item);
      if (copyList.length > 100) {
        copyList = copyList.slice(copyList.length - 50);
      }
      store.set('copyList', copyList);
    }
  }, 1000);

  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) createWin();
  // });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
