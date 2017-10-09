const electron = require('electron');
const countdown = require('./scripts/countDown.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let mainWindow;


let loadPage = () => {
    if (mainWindow) {
        mainWindow.loadURL(`file://${__dirname}/views/countdown.html`);
    }


};

let cleanup = () => {
    if (timer) {
        timer.stop();
        timer = null;
    }
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


let timer;

let activate = () => {
    app.on('ready', () => {
        console.log('ready prj_2_CoundownAPP !!!');
        mainWindow = new BrowserWindow({
            height: 400,
            width: 400
        });
        defineWindowHandlers();
        loadPage();

    });
    timer = countdown(count => {
        mainWindow.webContents.send('countdown', count);
    }, 100);

    ipc.on('countdown-start', () => {
        console.log('caught countdown-start');
        timer.toggle();
    })
};

activate();


// mainWindow.on('closed', () => {
//    console.log('mw closed');
//    mainWindow = null;
// });