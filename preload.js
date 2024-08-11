const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    loadJSONfiles: () => ipcRenderer.invoke('loadJSONfiles'),
    openPath: () => ipcRenderer.invoke('openPath'),
    saveJSONfile: (name, file)=> ipcRenderer.invoke('saveJSONfile', name, file)
});
