const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  onCopyListUpdate: (callback) => ipcRenderer.on('copyListUpdate', callback),
});
