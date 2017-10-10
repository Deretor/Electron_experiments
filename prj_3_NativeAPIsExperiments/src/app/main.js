const electron = require('electron');
const countdown = require('./scripts/countDown.js');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

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
            defineWindow();
            defineMenu();
            defineWindowHandlers();
            // loadPage();
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