// Modules to control application life and create native browser window
const {
  app,
  clipboard,
  BrowserWindow,
  globalShortcut,
} = require('electron');

const robot = require('robotjs');
const Store = require('electron-store');
const path = require('path');
const { setWinOnActiveScreen } = require('./utils/screenHelper');

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'QLIP BOARD',
    frame: false,
    show: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.loadURL('http://localhost:8080/');
  return mainWindow;
}

app.whenReady().then(() => {
  const store = new Store();
  const win = createWindow();

  let copyList = store.get('copyList') || [];
  let currentItem = copyList[copyList.length - 1];
  win.once('ready-to-show', () => {
    globalShortcut.register('Command+Shift+V', () => {
      win.send('copyListUpdate', copyList);
      setWinOnActiveScreen(win);
      win.show();
    });

    win.on('blur', () => {
      win.hide();
      setTimeout(() => {
        robot.keyTap('v', ['command']);
      }, 100);
    });
  });

  setInterval(() => {
    // TODO 文件
    const html = clipboard.readHTML();
    if (currentItem.html !== html) {
      // 过滤出图片
      const item = {
        text: clipboard.readText(),
        html,
        image: (/^<meta charset='.+'><img src="(.+)"\/>$/.exec(html))?.[1],
      };
      if (item.image) {
        item.img = clipboard.readImage().toDataURL();
        // console.log(clipboard.readImage().toDataURL());
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
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow();
  // });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
