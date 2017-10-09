const electron = require('electron');
const countdown = require('./scripts/countDown.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;

let mainWindow;


let loadPage = () => {
    if (mainWindow) {
        mainWindow.loadURL(`file://${__dirname}/views/countdown.html`);
    }
};

let cleanup = () => {

    mainWindow = null;
};

let defineWindowHandlers = () => {
    if (mainWindow) {
        mainWindow.on('closed', () => {
            console.log('mw closed');
            cleanup();
        })
    }
};

let defineWindow = () => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    });
};

let defineMenu =() => {
    const template = [
        {
            label: electron.app.getName()
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};


let timer;

let activate = () => {
    app.on('ready', () => {
        console.log('ready prj_2_CoundownAPP !!!');
        defineWindow();
        defineMenu();
        defineWindowHandlers();
        // loadPage();
    });
};

activate();


// mainWindow.on('closed', () => {
//    console.log('mw closed');
//    mainWindow = null;
// });