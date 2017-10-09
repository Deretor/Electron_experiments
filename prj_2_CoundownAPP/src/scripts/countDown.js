module.exports = (tickFunc, startValue = 100) => {

    let sValue = Number(String(startValue));
    let count = Number(String(startValue));
    let active = false;
    // let countdownArea = document.getElementById(anchor);
    let timer;
    let stopTimer = () => {
        if(active === false){
            return;
        }

        clearInterval(timer);
        active = false;
    };
    let restartTimer = (stValue) => {
        if (sValue) {
            sValue = stValue;
        }
        count = sValue;
        startTimer();
    };
    let startTimer = () => {
        if(active){
            return;
        }
        active = true;
        if (count < 0) {
            count = sValue;
        }
        timer = setInterval(() => {
            // if (countdownArea) {
            //     countdownArea.innerText = count;
            // }
            console.log('count: ', count);
            tickFunc(count--);
            if (count < 0) {
                stopTimer();
            }
        }, 1000);
    };
    let toggleTimer = () => {
        if(active){
            stopTimer();
            console.log('toStop');
        }else {
            console.log('toStart');
            startTimer();
        }
    };


    return {
        start: startTimer,
        stop: stopTimer,
        restart: restartTimer,
        toggle: toggleTimer
    }


};