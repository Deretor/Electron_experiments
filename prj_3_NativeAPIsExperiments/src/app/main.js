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
        console.log(`ready ${electron.app.getName()} !!!`);
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