class InputRange {
    constructor(id, discription) {
        this.discription = discription;

        this.elem = document.getElementById(id);
        this.value = this.elem.value;

        this.inscription = document.createElement('div');
        this.inscription.classList = 'inscription';
        this.inscription.innerHTML = this.elem.value + this.discription;


        this.elem.parentNode.appendChild(this.inscription);

        this.elem.oninput = () => {
            this.inscription.innerHTML = this.elem.value + this.discription;
            this.value = this.elem.value;
        };
    }

    get getValue() {
        return this.value;
    }

    stop() {
        this.elem.oninput = null;
        this.inscription.style.color = '#4cd137';
        this.inscription.style.fontWeight = 'bold';
    }
}

let canvas = document.getElementById('canvas');

let w = canvas.width = (window.innerWidth / 2 - window.innerWidth / 2 % 10 > window.innerHeight) 
                        ?  window.innerHeight - window.innerHeight % 10
                        : window.innerWidth / 2 - window.innerWidth / 2 % 10;
let h = canvas.height = w;

let ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

let inpSize = new InputRange('inpSize', 'px');
let inpSpeed = new InputRange('inpSpeed', 'fps');

let N = w / inpSize.getValue;
let M = N;
let arr = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        arr[i] = new Array(M).fill(0);
    }
}

document.getElementById('btnStart').addEventListener('click', start);

function start() {
    document.getElementById('btnStart').removeEventListener('click', start);
    canvas.onmousedown = null;

    N = w / inpSize.getValue;
    M = N;

    inpSize.stop();
    inpSpeed.stop();

    setInterval(() => {
        ctx.clearRect(0, 0, w, h);
        life();
        drawPixel();
    }, 1000 / inpSpeed.getValue);
}

function drawPixel() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (arr[i][j]) {
                ctx.fillRect(i * inpSize.getValue, j * inpSize.getValue, inpSize.getValue, inpSize.getValue);
            }
        }
    }
}

function life() {
    let c = copyArray();

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            let n = 0;
            n += at(i - 1, j);
            n += at(i + 1, j);
            n += at(i, j - 1);
            n += at(i, j + 1);
            n += at(i - 1, j - 1);
            n += at(i + 1, j - 1);
            n += at(i - 1, j + 1);
            n += at(i + 1, j + 1);

            if (arr[i][j]) {
                if (n != 2 && n != 3) c[i][j] = 0;
            } else {
                if (n == 3) c[i][j] = 1;
            }

        }
    }

    arr = c;
}

function at(i, j) {
    if (i > N - 1) {
        i = 0;
    }
    if (i < 0) {
        i = N - 1;
    } 
    if (j > M - 1) {
        j = 0;
    }
    if (j < 0) {
        j = M - 1;
    } 

    return arr[i][j];
}

function copyArray() {
    let newArr = [];

    for (let i = 0; i < N; i++) {
        newArr[i] = [];
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            newArr[i][j] = arr[i][j];
        }
    }

    return newArr;
}

canvas.onmousedown = (e) => {
    inpSize.stop();

    setPixel(e.clientX, e.clientY);
    canvas.onmousemove = (event) => {
        setPixel(event.clientX, event.clientY);
    } 
};

canvas.onmouseup = () => {
    canvas.onmousemove = null;
}

function setPixel(x, y) {
    let rect = canvas.getBoundingClientRect();
    let i = Math.floor((x - rect.left) / inpSize.getValue);
    let j = Math.floor((y - rect.top) / inpSize.getValue);

    arr[i][j] = 1;
    ctx.clearRect(0, 0, w, h);
    drawPixel();
}




