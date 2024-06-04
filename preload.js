const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('version', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

})

contextBridge.exposeInMainWorld('api', {
    addUser: (username, email) => ipcRenderer.invoke('add-user', username, email),
    getUsers: () => ipcRenderer.invoke('get-users'),
    authenticateUser: (name, email) => ipcRenderer.invoke('authenticate-user', name, email)
});

