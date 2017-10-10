// const countdown = require('./countDown');
const electron = require('electron');
const ipc = electron.ipcRenderer;


let anchor = document.getElementById('jsAnchor');
let blinkF = () => {
    if (anchor) {
        anchor.style.display = 'none';
        setTimeout(() => {
            anchor.style.display = 'block';
            setTimeout(() => blinkF(), 1000);
        }, 1000);
    }
};

let btnHandler = () => {
    document.getElementById('btn').addEventListener('click', () => {
        console.log('click countdown-start');
        ipc.send('countdown-start');
    })
};

let setCountDownHendler = () => {
    ipc.on('countdown', (evt, count) => {
        document.getElementById('CDArea').innerText = count;
    })

};

let activate = () => {
    console.log('renderer start');
    setCountDownHendler();
    btnHandler();

};

activate();

// countdown('CDArea');
// blinkF();
