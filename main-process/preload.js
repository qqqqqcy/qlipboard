const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  onCopyListUpdate: (callback) => ipcRenderer.on('copyListUpdate', callback),
  onChangeActiveIdx: (callback) => ipcRenderer.on('changeActiveIdx', callback),
  ipcRenderer,
  onSelectedItem: (index) => ipcRenderer.send('selectedItem', index),
});
