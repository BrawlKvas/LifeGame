let canvas = document.getElementById('canvas');


let w = canvas.width = window.innerWidth / 2 - window.innerWidth / 2 % 10;
let h = canvas.height = w;

let ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

let sizeBlock = 5;

let N = w / sizeBlock;
let M = h / sizeBlock;
let arr = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        arr[i] = new Array(M).fill(0);
    }
}

function start() {
    document.getElementById('btnStart').removeEventListener('click', start);

    setInterval(() => {
        ctx.clearRect(0, 0, w, h);
        life();
        drawPixel();
    }, 1000 / 60);
}

document.getElementById('btnStart').addEventListener('click', start);

function drawPixel() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (arr[i][j]) {
                ctx.fillRect(i * sizeBlock, j * sizeBlock, sizeBlock, sizeBlock);
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
    let i = Math.floor((x - rect.left) / sizeBlock);
    let j = Math.floor((y - rect.top) / sizeBlock);

    arr[i][j] = 1;

    drawPixel();
}

class InputRange {
    constructor(id) {
        this.elem = document.getElementById(id);

        this.inscription = document.createElement('div');
        this.inscription.classList = 'inscription';
        this.changeRange();

        this.elem.parentNode.appendChild(this.inscription);

        this.elem.addEventListener('input', this.changeRange.bind(this));
    }

    changeRange() {
        this.inscription.innerHTML = this.elem.value;
    }
}
new InputRange('inpSize');
new InputRange('inpSpeed');

