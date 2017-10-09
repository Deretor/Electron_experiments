const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;


let loadPage = () => {
  if(mainWindow){
      mainWindow.loadURL(`file://${__dirname}/views/countdown.html`);
  }
  // console.log('cd', countdown);

};



let defineWindowHandlers = () => {
    if(mainWindow){
        mainWindow.on('closed', () => {
            console.log('mw closed');
         mainWindow = null;
        })
    }
};

app.on('ready',  () => {
    console.log('ready !!!');
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    });
    defineWindowHandlers();
    loadPage();


});



// mainWindow.on('closed', () => {
//    console.log('mw closed');
//    mainWindow = null;
// });