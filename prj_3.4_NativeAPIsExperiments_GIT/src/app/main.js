const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, Menu, Tray, ipcMain: ipc} = electron;


let mainWindow;


let loadPage = () => {
    if (mainWindow) {
        mainWindow.loadURL(`file://${__dirname}/views/status.html`);
    }
};


let defineWindowHandlers = () => {
    if (mainWindow) {
        mainWindow.on('closed', () => {
            console.log('mw closed');
            mainWindow = null;
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
        width: 700
    });
};


function defineMenu() {
    let menu = Menu.buildFromTemplate([{label: 'Меню'}]);
    Menu.setApplicationMenu(menu);
}

let activate = () => {
    app.on('ready', () => {
        try {
            console.log(`ready ${electron.app.getName()} !!!`);
            defineTray();
            defineWindow();
            defineMenu();
            defineWindowHandlers();
            loadPage();
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