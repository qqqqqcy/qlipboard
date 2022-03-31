const { clipboard } = require('electron');
const Store = require('electron-store');
const robot = require('robotjs');

const MAX_LENGTH = 15;
const CHECK_DURATION = 800;
class ClipboardEx {
  index = -1

  copyList = []

  store = new Store()

  static isImageItem({ html }) {
    // return (/^<meta charset='.+'><img src="(.*http.+)"\/>$/.exec(html))?.[1];
    return (/^<meta charset='.+'><img src="(http.+)"\/>$/.exec(html))?.[1];
  }

  constructor() {
    this.copyList = this.store.get('copyList') || this.copyList;
    this.index = this.store.get('copyListIndex') || this.index;

    setInterval(() => {
      const item = {
        text: clipboard.readText(),
        html: clipboard.readHTML(),
      };
      // 选中了 image
      if (!item.text && !item.html) {
        return;
      }
      // 选中了 text
      if (item.text === item.html) {
        return;
      }
      if (this.hasRepeatItem(item)) {
        return;
      }
      if (this.item.html !== item.html) {
        this.index = (this.index + 1) % MAX_LENGTH;
        // 如果是图片
        if (ClipboardEx.isImageItem(item)) {
          // TODO 保存到本地
          item.img = clipboard.readImage().toDataURL();
          item.imgNative = clipboard.readImage();
        }
        this.copyList[this.index] = item;
        this.store.set('copyList', this.copyList);
        this.store.set('copyListIndex', this.index);
      }
    }, CHECK_DURATION);
  }

  get item() {
    return this.copyList[this.index] || {};
  }

  get orderCopyList() {
    return [].concat(
      this.copyList.slice(this.index + 1, MAX_LENGTH),
      this.copyList.slice(0, (this.index + 1)),
    ).reverse();
  }

  get searchList() {
    return this.copyList.map(({ html, text } = {}) => `${html}-${text}`);
  }

  replaceItem(i, j = this.index) {
    const temp = this.copyList[i];
    this.copyList[i] = this.copyList[j];
    this.copyList[j] = temp;
  }

  hasRepeatItem({ html, text }) {
    const repeatIndex = this.searchList.indexOf(`${html}-${text}`);
    if (repeatIndex >= 0) {
      this.replaceItem(repeatIndex);
      return true;
    }
    return false;
  }

  handlerItemByOrderIndex(index) {
    const realIndex = (MAX_LENGTH - (index - this.index)) % MAX_LENGTH;
    this.replaceItem(realIndex);

    if (this.item.imgNative) {
      clipboard.writeImage(this.item.imgNative);
    } else {
      clipboard.writeText(this.item.text);
    }

    robot.keyTap('v', ['command']);
  }

  clearClipboard() {
    this.index = -1;
    this.copyList = [];
    this.store.set('copyList', this.copyList);
    this.store.set('copyListIndex', this.index);
  }
}

module.exports = {
  ClipboardEx,
};
