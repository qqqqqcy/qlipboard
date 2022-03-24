const { screen } = require('electron');

const getActiveScreen = () => {
  const displays = screen.getAllDisplays();
  return displays.find(
    ({
      bounds: {
        x, y, width, height,
      },
    }) => {
      const { x: cursorX, y: cursorY } = screen.getCursorScreenPoint();
      return cursorX >= x && cursorX <= x + width && cursorY >= y && cursorY <= y + height;
    },
  );
};

const winWidth = 400;
let oldId = '';
function setWinOnActiveScreen(win) {
  const {
    id,
    bounds: {
      x, y, width, height,
    },
  } = getActiveScreen();
  if (oldId === id) {
    return;
  }
  oldId = id;
  // TODO 动画效果
  win.setBounds({
    x: x + width - winWidth,
    y,
    height,
    width: winWidth,
  });
}

module.exports = {
  getActiveScreen,
  setWinOnActiveScreen,
};
