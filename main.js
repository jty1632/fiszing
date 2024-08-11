const { app, BrowserWindow, ipcMain, shell } = require('electron');
const fs = require('fs');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1050,
    height: 750,
    minHeight: 750,
    minWidth: 1050,
    autoHideMenuBar: true,
    webPreferences:{
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('src/index.html');
}
ipcMain.handle('loadJSONfiles', async()=>{
  var entries = fs.readdirSync((path.join(app.getAppPath()) + `/src/JSONfiles`));
  return entries;
});
ipcMain.handle('saveJSONfile', async(e, name, file)=>{
  fs.writeFileSync((path.join(app.getAppPath()) + `/src/JSONfiles/${name}.json`), JSON.stringify(file, null, 2));
});
ipcMain.handle('openPath', ()=>{
  shell.openPath(path.join(app.getAppPath())+ "/src/JSONfiles");
});

app.whenReady().then(() => {
  createWindow()
})