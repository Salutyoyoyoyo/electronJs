const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const {join} = require("path");
const userController = require('./src/UserController.js');
const {getUsers} = require("./src/UserController");

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
            win.webContents.openDevTools();
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

ipcMain.handle('add-user', async (event, name, email) => {
    try {
        const userId = await userController.addUser(name, email);
        return { success: true, userId };
    } catch (err) {
        return { success: false, message: err.message };
    }
});

ipcMain.handle('get-users', async () => {
    try {
        const users = await userController.getUsers();
        return { success: true, users };
    } catch (err) {
        return { success: false, message: err.message };
    }
});

ipcMain.handle('authenticate-user', async (event,name, email) => {
    try {
        const user = await userController.authenticateUser(name, email);
        if (user) {
            return { success: true, user };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (err) {
        console.error('Erreur lors de l\'authentification de l\'utilisateur:', err.message);
        return { success: false, message: err.message };
    }
});