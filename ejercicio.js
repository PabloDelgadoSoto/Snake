let table;
let cabeza;
let fruta = [];

let comida = false;

let imagenCabeza = "background-image:url(cabeza.jpg);background-size:100% 100%;";
let imagenCola = "background-image:url(cola.jpg);background-size:100% 100%;";
let colorSerpiente = 'background-image:url(recta.jpg);background-size:100% 100%;';
let colorFruta = 'background-image:url(fruta.jpg);background-size:100% 100%;';
let colorFondo = 'background-color:blue';

const movimientos = {
    'ArrowUp': [0, -1, "transform: scaleY(-1);rotate: 90deg;", "transform:scaleX(-1);rotate:270deg"],
    'ArrowDown': [0, 1, "transform: scaleY(-1);rotate: 270deg;", "transform:scaleX(-1);rotate:90deg;"],
    'ArrowLeft': [1, -1, "", "transform:scaleX(1);"],
    'ArrowRight': [1, 1, "transform: scaleY(-1);rotate: 180deg;", "transform: scaleX(-1);"]
}
const opciones = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const tablero = 10;
const turnos = tablero / 2;
let contFruta = tablero / 2;
let serpiente = [];
let direccion = 'ArrowRight';
let intervalo;
let velocidad = 500;

window.onload = function () {
    table = document.getElementById('table');
    hacerTabla();
};

const hacerTabla = function () {
    for (let i = 0; i <= tablero; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j <= tablero; j++) {
            let td = document.createElement('td');
            td.setAttribute('id', i + '-' + j);
            tr.appendChild(td);
        }
        table.appendChild(tr);
        serpiente = [tablero / 2 + '-' + tablero / 2, tablero / 2 + '-' + (tablero / 2 - 1), tablero / 2 + '-' + (tablero / 2 - 2)];
    }
    pintarSerpiente(colorSerpiente);
    document.addEventListener('keydown', function (event) {
        inArray(opciones, event.key) ? cambiarDirección(event.key) : '';
    })
    intervalo = setInterval(() => {
        moverCabeza();
    }, velocidad);
};

const cambiarDirección = function (tecla) {
    direccion = tecla;
}

const moverCabeza = function () {
    let marca = serpiente[0].split('-');
    marca[movimientos[direccion][0]] = parseInt(marca[movimientos[direccion][0]]) + parseInt(movimientos[direccion][1]);
    marca[0] = desbordar(marca[0]);
    marca[1] = desbordar(marca[1]);
    let suma = marca[0] + '-' + marca[1];
    pintarAzul();
    moverCuerpo();
    serpiente[0] = suma;
    comer(serpiente[0]);
    if (contFruta == turnos) {
        crearFruta();
    }
    pintarSerpiente();
    contFruta++;
    if (perder(serpiente, serpiente[0])) {
        rehacer();
    }
}

const moverCuerpo = function () {
    let guardar = [];
    serpiente.push();
    serpiente.forEach(parte => {
        guardar.push(parte);
    });
    for (let i = 1; i < serpiente.length; i++) {
        serpiente[i] = guardar[i - 1];
    }
    if (comida) {
        serpiente.push(guardar[serpiente.length - 1]);
        comida = false;
    }
}

const pintarAzul = function (){
    serpiente.forEach(parte => {
        let e = document.getElementById(parte);
        e.setAttribute('style', colorFondo);
    });
}

const pintarSerpiente = function () {
    for(let i=1;i<serpiente.length-1;i++){
        let e = document.getElementById(serpiente[i]);
        e.setAttribute('style', pintarCurva(i));
    }
    let e = document.getElementById(serpiente[0]);
    e.setAttribute('style', imagenCabeza + movimientos[direccion][2]);
    e = document.getElementById(serpiente[serpiente.length - 1]);
    e.setAttribute('style', imagenCola + verSiguiente(serpiente.length - 1));
}

const crearFruta = function () {
    let id = Math.floor(Math.random() * tablero) + '-' + Math.floor(Math.random() * tablero);
    if (inArray(serpiente, id)) {
        crearFruta();
    }
    let f = document.getElementById(id);
    f.setAttribute('style', colorFruta);
    fruta.push(id);
    contFruta = 0;
}

const comer = function (cabeza) {
    if (inArray(fruta, cabeza)) {
        //turbo
        /*
        clearInterval(intervalo);
        velocidad -= 30;
        intervalo = setInterval(() => {
            moverCabeza();
        }, velocidad);
        */
        comida = true;
    }
}

const desbordar = function (num) {
    if (num < 0) {
        return tablero;
    } else if (num > tablero) {
        return 0;
    }
    return num;
};

const inArray = function (arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == e) return true;
    }
    return false;
};

const perder = function (arr, e) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == e) return true;
    }
    return false;
}

const rehacer = function () {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    clearInterval(intervalo);
    document.write('Perdiste, recarga la página para volver a comenzar');
}

function verSiguiente(num) {
    let mov = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    let s = serpiente[num].split("-");
    let base0 = s[0];
    let base1 = s[1];
    for (let j = 0; j < 4; j++) {
        s[0] = base0;
        s[1] = base1;
        s[movimientos[mov[j]][0]] = parseInt(s[movimientos[mov[j]][0]]) + parseInt(movimientos[mov[j]][1]);
        let marca = desbordar(s[0])+'-'+desbordar(s[1]);
        if (marca == serpiente[num - 1]) {
            return movimientos[mov[j]][3];
        }
    };
    return "";
}

function pintarCurva(num) {
    const sitio ={
        "ArrowUpArrowDown":'background-image:url(recta.png);background-size:100% 100%;rotate: 270deg;',
        "ArrowUpArrowLeft":'background-image:url(curva.png);background-size:100% 100%;rotate: 270deg;',
        "ArrowUpArrowRight":'background-image:url(curva.png);background-size:100% 100%;',
        "ArrowDownArrowLeft":'background-image:url(curva.png);background-size:100% 100%;rotate: 180deg;',
        "ArrowDownArrowRight":'background-image:url(curva.png);background-size:100% 100%;rotate: 90deg;',
        "ArrowLeftArrowRight":'background-image:url(recta.png);background-size:100% 100%;'
    }
    let mov = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    let donde = "";
    let s = serpiente[num].split("-");
    let base0 = s[0];
    let base1 = s[1];
    for (let j = 0; j < 4; j++) {
        s[0] = base0;
        s[1] = base1;
        s[movimientos[mov[j]][0]] = parseInt(s[movimientos[mov[j]][0]]) + parseInt(movimientos[mov[j]][1]);
        let marca = desbordar(s[0])+'-'+desbordar(s[1]);
        if (marca == serpiente[num - 1] || marca == serpiente[num+1]) {
            donde += mov[j];
        }
    };
    return sitio[donde];
}