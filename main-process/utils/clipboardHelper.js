const { clipboard, nativeImage } = require('electron');
const Store = require('electron-store');
const { MAX_LENGTH } = require('../constants');

const CHECK_DURATION = 800;
const EMPTY_IMAGE = 'data:image/png;base64,';

class ClipboardEx {
  // dataPath = './'

  index = -1

  copyList = []

  store = new Store()

  // static isImageItem({html}) {
  // return (/^<meta charset='.+'><img src="(http.+)"\/>$/.exec(html))?.[1];
  // }

  constructor({ dataPath }) {
    this.dataPath = dataPath;
    this.copyList = this.store.get('copyList') || this.copyList;
    this.index = this.store.get('copyListIndex') || this.index;

    setInterval(() => {
      const item = {
        text: clipboard.readText(),
        html: clipboard.readHTML(),
      };
      // 判断 item 类型
      const imageNative = clipboard.readImage();
      const img = imageNative.toDataURL();
      if (img !== EMPTY_IMAGE) {
        item.type = 'image';
        item.img = img;
      } else {
        item.type = 'text';
      }

      // 判断是否相同
      if (!this.handlerRepeatItem(item)) {
        // if (item.type === 'image') {
        // TODO 图片处理，暂时先用 toDataURL
        //   const fileName = `image-${new Date().valueOf()}.png`;
        //   fs.writeFile(
        //     path.join(this.dataPath, fileName),
        //     imageNative.toPNG(),
        //     {},
        //     () => {
        //       console.log('save ok !');
        //     },
        //   );
        //   item.fileName = fileName;
        // }

        this.index = (this.index + 1) % MAX_LENGTH;
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

  replaceItem(i, j = this.index) {
    if (i === j) {
      return;
    }
    const temp = this.copyList[i];
    this.copyList[i] = this.copyList[j];
    this.copyList[j] = temp;
  }

  handlerRepeatItem(item) {
    let repeatIndex = -1;
    const result = this.orderCopyList.some((existingItem) => {
      if (!existingItem) {
        return false;
      }
      repeatIndex += 1;
      switch (item.type) {
        case 'image':
          return existingItem.img === item.img;
        default:
          if (item.html && item.html !== item.text) {
            return existingItem.html === item.html;
          }
          return existingItem.text === item.text;
      }
    });

    if (result) {
      this.replaceItem(this.changeRealIndexToRealIndex(repeatIndex));
      return true;
    }
    return false;
  }

  changeRealIndexToRealIndex(index) {
    return (MAX_LENGTH - (index - this.index)) % MAX_LENGTH;
  }

  handlerItemByOrderIndex(index) {
    const realIndex = this.changeRealIndexToRealIndex(index);
    this.replaceItem(realIndex);

    if (this.item.type === 'image') {
      clipboard.writeImage(nativeImage.createFromDataURL(this.item.img));
    } else {
      clipboard.writeText(this.item.text);
    }
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
