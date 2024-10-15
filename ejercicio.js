let table;
let cabeza;
var fruta = [];

var comida = false;

var colorSerpiente = 'background-color:green';
var colorFruta = 'background-color:red';
var colorFondo = 'background-color:blue';

const movimientos ={
    'ArrowUp':[0,-1],
    'ArrowDown':[0,1],
    'ArrowLeft':[1,-1],
    'ArrowRight':[1,1]
}
const opciones = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const tablero = 10;
const turnos = tablero/2;
var contFruta = tablero/2;
var serpiente = [];
var direccion = 'ArrowRight';
var intervalo;
var velocidad = 500;

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
        serpiente = [tablero/2+'-'+tablero/2, tablero/2+'-'+(tablero/2-1), tablero/2+'-'+(tablero/2-2)];
    }
    pintarSerpiente(colorSerpiente);
    document.addEventListener('keydown', function(event){
        inArray(opciones, event.key)?cambiarDirección(event.key):'';
    })
    intervalo = setInterval(() => {
        moverCabeza();
    }, velocidad);
};

const cambiarDirección = function(tecla){
    direccion = tecla;
}

const moverCabeza = function(){
    let marca = serpiente[0].split('-');
    marca[movimientos[direccion][0]] = parseInt(marca[movimientos[direccion][0]]) + parseInt(movimientos[direccion][1]);
    marca[0] = desbordar(marca[0]);
    marca[1] = desbordar(marca[1]);
    let suma = marca[0]+'-'+marca[1];
    pintarSerpiente(colorFondo);
    moverCuerpo();
    serpiente[0] = suma;
    comer(serpiente[0]);
    if(contFruta == turnos){
        crearFruta();
    }
    pintarSerpiente(colorSerpiente);
    contFruta++;
    if(perder(serpiente, serpiente[0])){
        rehacer();
    }
}

const moverCuerpo = function(){
    let guardar = [];
    serpiente.push();
    serpiente.forEach(parte => {
        guardar.push(parte);
    });
    for(let i = 1; i < serpiente.length; i++){
        serpiente[i] = guardar[i-1];
    }
    if(comida){
        serpiente.push(guardar[serpiente.length-1]);
        comida = false;
    }
}

const pintarSerpiente = function(color){
    serpiente.forEach(parte => {
        let e = document.getElementById(parte);
        e.setAttribute('style', color);
    });
    
}

const crearFruta = function(){
    let id = Math.floor(Math.random()*tablero)+'-'+Math.floor(Math.random()*tablero);
    if(inArray(serpiente, id)){
        crearFruta();
    }
    let f = document.getElementById(id);
    f.setAttribute('style', colorFruta);
    fruta.push(id);
    contFruta = 0;
}

const comer = function(cabeza){
    if(inArray(fruta, cabeza)){
        clearInterval(intervalo);
        velocidad -= 30;
        intervalo = setInterval(() => {
            moverCabeza();
        }, velocidad);
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

const perder = function(arr, e){
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == e) return true;
    }
    return false;
}

const rehacer = function(){
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    document.write('Perdiste, recarga la página para volver a comenzar');
}
