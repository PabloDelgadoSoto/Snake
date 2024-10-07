let table;
let cabeza;
var tablero = 10;
var serpiente = ['5-4', '5-3', '5-2'];

var verde = 'background-color:green';
var rojo = 'background-color:red';
var azul = 'background-color:blue';

const movimientos ={
    'ArrowUp':[0,-1],
    'ArrowDown':[0,1],
    'ArrowLeft':[1,-1],
    'ArrowRight':[1,1]
}

const opciones = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

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
    }
    serpiente.push(tablero/2+'-'+tablero/2);
    pintarSerpiente(verde);
    document.addEventListener('keydown', function(event){
        inArray(opciones, event.key)?moverCabeza(event.key):'';
    })
};

const moverCabeza = function(tecla){
    let marca = serpiente[0].split('-');
    marca[movimientos[tecla][0]] = parseInt(marca[movimientos[tecla][0]]) + parseInt(movimientos[tecla][1]);
    marca[0] = desbordar(marca[0]);
    marca[1] = desbordar(marca[1]);
    let suma = marca[0]+'-'+marca[1];
    pintarSerpiente(azul);
    serpiente[0] = suma;
    moverCuerpo();
    pintarSerpiente(verde);
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
}

const pintarSerpiente = function(color){
    serpiente.forEach(parte => {
        let e = document.getElementById(parte);
        e.setAttribute('style', color);
    });
    
}

const desbordar = function (num) {
    if (num < 0) {
        return 0;
    } else if (num > tablero) {
        return tablero;
    }
    return num;
};

const inArray = function (arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == e) return true;
    }
    return false;
};

