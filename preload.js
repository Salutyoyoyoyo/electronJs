const {contextBridge} = require('electron');

contextBridge.exposeInMainWorld('version', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

})