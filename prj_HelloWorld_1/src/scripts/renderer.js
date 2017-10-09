

console.log('log in renderer');

alert('alert in renderer');

let anchor = document.getElementById('jsAnchor');
let blinkF = () => {
    if(anchor){
        anchor.style.display = 'none';
        setTimeout(() => {anchor.style.display = 'block';
            setTimeout(() => blinkF(), 1000);
        }, 1000);
    }
};
blinkF();
