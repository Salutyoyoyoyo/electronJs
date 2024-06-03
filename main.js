const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const {join} = require("path");

require('electron-reload')(__dirname, {
    electron: join(__dirname, 'node_modules', '.bin', 'electron')
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    win.loadFile('index.html')
        .then(() => {
            console.log('File loaded successfully');
        })
        .catch((error) => {
            console.error('Error loading file:', error);
        });
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
