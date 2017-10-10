// const countdown = require('./countDown');


(() => {
    const electron = require('electron');
    const fs = require('fs');
    const exec = require('child_process').exec;
    const {ipcRenderer: ipc} = electron;


    function isDir(dir) {
        try {
            return fs.lstatSync(dir).isDirectory();
        } catch (e) {
            console.error(`Can\'t check directory ${dir}:`, e.message, e);
            return false;
        }

    }

    function formatDir(dir) {
        return /^~/.test(dir) ? os.homedir() + dir.substr(1).trim() : /^>/.test(dir) ? `${__dirname}${dir.substr(1).trim() }` : dir.trim();
    }

    let st = document.getElementById('status');
    let stPT = document.getElementById('statusPT');
    let input = document.getElementById('stInput');

    function drowStatusText(status) {
        if (status) {
            st.innerText = status;
        } else {
            st.innerText = '';
        }
    }
    function clearStatusClass(){
        input.classList.remove('unknown','clear','dirty');
        st.classList.remove('unknown','clear','dirty');
        stPT.classList.remove('unknown','clear','dirty');
    }

    function setStatusClass(status){
        clearStatusClass();
        input.classList.add(status);
        st.classList.add(status);
        stPT.classList.add(status);
    }

    function drowStatus(statusTag, message) {
        switch (statusTag) {
            case 'unknown':
                drowStatusText(message);
                setStatusClass('unknown');
                break;
            case 'clear':
                drowStatusText(message);
                setStatusClass('clear');
                break;
            case 'dirty':
                drowStatusText(message);
                setStatusClass('dirty');
                break;
            default:
                drowStatusText(message);
                setStatusClass('unknown');
                break;
        }
    }


    function checkGitStatus(dir) {

        if (isDir(dir)) {
            exec('git status', {
                cwd: dir
            }, (err, stdout, stderr) => {
                console.log(`err: ${err}`, err);
                console.log(`stdout: ${stdout}`, stdout);
                console.log(`stderr: ${stderr}`, stderr);
                if (err) {
                    drowStatus('unknown', err.message);
                } else if (stdout) {
                    if(/nothing to commit/.test(stdout)){
                        return drowStatus('clean',stdout);
                    }else{
                        return drowStatus('dirty',stdout);
                    }
                } else if (stderr.message) {
                    return drowStatus('unknown', stderr.message);
                } else {
                    return drowStatus('unknown', 'not in params');
                }

            })
        } else {
            if (!st.innerText || st.innerText !== '') {
                return drowStatus('unknown', `dir "${dir}" is not directory`);

            }
        }

    }


    let activate = () => {
        let timer = null;
        if (input) {
            input.addEventListener('keyup', (evt) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    console.log('update catched', input.value);
                    let dir = evt.target.value;
                    let dir1 = formatDir(dir);
                    checkGitStatus(dir1);

                }, 400)
            })
        }
    };

    activate();
})();
