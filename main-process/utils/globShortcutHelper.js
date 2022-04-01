const { globalShortcut } = require('electron');
const { MAX_LENGTH } = require('../constants');

function registerShortCut(win) {
  win.showInactive();

  globalShortcut.register('Up', () => {
    win.send('changeActiveIdx', { type: 'move', val: -1 });
  });
  globalShortcut.register('Down', () => {
    win.send('changeActiveIdx', { type: 'move', val: 1 });
  });
  globalShortcut.register('Return', () => {
    win.send('changeActiveIdx', { type: 'select' });
  });

  let num = 0;
  for (let index = 0; index < 10; index += 1) {
    // eslint-disable-next-line no-loop-func
    globalShortcut.register(String(index), () => {
      num = num * 10 + index;
      if (num > MAX_LENGTH) {
        num = index;
      }
      win.send('changeActiveIdx', { type: 'jump', val: num === 0 ? 9 : num - 1 });
    });
  }
}
const GLOBAL_SHORTCUT_KEY = [
  'Up', 'Down', 'Esc', 'Return',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

function unregisterShortCut() {
  GLOBAL_SHORTCUT_KEY.forEach((item) => globalShortcut.unregister(item));
}

module.exports = {
  registerShortCut,
  unregisterShortCut,
};
