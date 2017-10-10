const electron = require('electron');
const countdown = require('./scripts/countDown.js');
const path = require('path');


const {app, BrowserWindow, Menu, Tray, globalShortcut} = electron;

const ipc = electron.ipcMain;

let mainWindow = null;
let captureWindow = null;


let loadPage = () => {
    if (captureWindow) {
        captureWindow.loadURL(`file://${__dirname}/views/capture.html`);
    }

};

let cleanup = () => {

    mainWindow = null;
};

let definelobalShortcuts = () => {

    globalShortcut.register('Ctrl+P', () => {
        try {
            captureWindow.webContents.send('capture', app.getPath('pictures'));
            console.log('catch shortcut');

        } catch (e) {
            console.error('error in shortcut catch ', e.message, e);
        }
    });

};

let defineWindowHandlers = () => {
    if (mainWindow) {
        mainWindow.on('closed', () => {
            console.log('mw closed');
            mainWindow = null;
        })
    }
    if (captureWindow) {
        captureWindow.on('closed', () => {
            console.log('captW closed');
            captureWindow = null;
        })
    }


};

let defineTray = () => {
    const path1 = path.join('src', 'app/content/img/someIcon.jpg');
    const tray = new Tray(path1);

    const trayMenu = Menu.buildFromTemplate([
        {
            label: 'Native API Demo'
        },
        {
            type: 'separator'
        },
        {
            label: 'Закрыть',
            click: () => app.quit()
        }
    ]);
    tray.setToolTip('Native API Demo');
    tray.setContextMenu(trayMenu);
};

let defineWindow = () => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    });
};
let defineInvisibleWindow = () => {
    captureWindow = new BrowserWindow({
        height: 400,
        width: 400,
        resizeable: false,
        frame: false,
        show: false
    });
};

let defineMenu = () => {
    let name = electron.app.getName();
    const template = [
        {
            label: 'Меню',
            submenu: [
                {
                    label: `О ${name}`,
                    click: () => {
                        console.log('submenu about click');
                    },
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: `Выход`,
                    click: () => {
                        app.quit();
                    },
                    accelerator: 'CommandOrControl+Q'
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};


let timer;

let activate = () => {
    app.on('ready', () => {
        try {
            console.log(`ready ${electron.app.getName()} !!!`);
            defineTray();
            defineInvisibleWindow();
            definelobalShortcuts();
            loadPage();
            // defineMenu();
            defineWindowHandlers();
        } catch (e) {
            console.error('error in main: ', e.message, e)
        }
    });
};

activate();


// mainWindow.on('closed', () => {
//    console.log('mw closed');
//    mainWindow = null;
// });