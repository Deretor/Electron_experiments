const electron = require('electron');
const path = require('path');
const fs = require('fs');
const {ipcRenderer: ipc, desktopCapturer: deskCapture, screen} = electron;


let writeScreenshot = (pic, filePath) => {
    fs.writeFile(filePath, pic, err => {
        if (err) {
            console.error('Error in write screenshot: ', err);
        }
    })
};

let onCapture = (evt, targetPath) => {
    console.log('captured in capture.js');
    getMainSource(deskCapture, screen, source => {
        const pic = source.thumbnail.toPNG();
        const filePath = path.join(targetPath, Date.now() + '.png');
        writeScreenshot(pic, filePath);
    })
};

let getMainSource = (capturer, screen, done) => {
    const options = {types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize};
    console.log('deskCapt', deskCapture);
    deskCapture.getSources(options, (err, srcs) => {
        if (err) {
            return console.log('Cannot capture screen', err);
        }
        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1'
        done(srcs.filter(isMainSource)[0])
    })
};

let activate = () => {
    ipc.on('capture', onCapture)
};
activate();