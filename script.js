'use strict'

const listaOperadores = ["+","-","x","/","%"];
const listaNumeros  = [0,1,2,3,4,5,6,7,8,9];

//#region EventButtons
const contenedores = document.querySelectorAll('.button');

contenedores.forEach((contenedor) => {
    contenedor.addEventListener('click', (event) => {
        const id = event.target.id;
        let valorEscribir;

        switch(id){
            case 'num-0': valorEscribir = 0;
                break;
            case 'num-1': valorEscribir = 1;
                break;
            case 'num-2': valorEscribir = 2;
                break;
            case 'num-3': valorEscribir = 3;
                break;
            case 'num-4': valorEscribir = 4;
                break;
            case 'num-5': valorEscribir = 5;
                break;
            case 'num-6': valorEscribir = 6;
                break;
            case 'num-7': valorEscribir = 7;
                break;    
            case 'num-8': valorEscribir = 8;
                break;
            case 'num-9': valorEscribir = 9;
                break;
            case 'but-parentesis-l': valorEscribir = "(";
                break;
            case 'but-parentesis-r': valorEscribir = ")";
                break;
            case 'but-porcentaje': valorEscribir = "%";
                break;
            case 'but-suma': valorEscribir = "+";
                break;
            case 'but-resta': valorEscribir = "-";
                break;
            case 'but-division': valorEscribir = "/";
                break;
            case 'but-multiplicacion': valorEscribir = "x";
                break;
            case 'but-punto': valorEscribir = ".";
                break;
            case 'but-c': LimpiarPantalla();
                return;
            case 'but-ce': LimpiarPantalla();
                return;
            case 'but-borrar': EliminarUltimoElemento();
                return;
            case 'but-conversion': Conversion(ObtenerTextoPantalla())
                return;
            case 'but-igual': RealizarOperacion(ObtenerTextoPantalla());
                return;
        }

        if(valorEscribir == undefined)
            return;

        EscribirEnPantalla(valorEscribir);
    })
})
//#endregion

//Metodo que limpia la pantalla y la deja en "0"
const LimpiarPantalla = () => {
    document.querySelector("#pantalla").textContent = "0";
}

//Elimina el ultimo caracter ingresado
const EliminarUltimoElemento = () => {
    if(ObtenerTextoPantalla() == "Syntaxis Error"){
        LimpiarPantalla(); 
        return;
    }
    document.querySelector("#pantalla").textContent = (ObtenerTextoPantalla().slice(0, -1));
}

//Obtenemos el valor de la pantalla
const ObtenerTextoPantalla = () =>{
    const texto = document.querySelector("#pantalla");
    return texto.textContent;
}

//Metdodo donde valida el ingreso de numeros y simbolos antes de agregarlos
const EscribirEnPantalla = (valor) =>{
    let textoPantalla = ObtenerTextoPantalla();
    let ultimoDigito = (textoPantalla.slice(-1));

    if(textoPantalla == "Syntaxis Error")
        return;

    if (listaNumeros.includes(valor)) {
        if (ultimoDigito === "0" && textoPantalla.length === 1) {
            EliminarUltimoElemento();
        }
        document.querySelector("#pantalla").textContent += valor;
        return;
    }

    if (listaOperadores.includes(valor) && listaOperadores.includes(ultimoDigito)) {
        EliminarUltimoElemento();
    }

    document.querySelector("#pantalla").textContent += valor;
}

const Conversion = (valor) => {
    let contador = 0;

    for(let i = valor.length; i >= 0; i--){
        if(listaNumeros.includes(valor[i]))
            contador++;
    }
}

const Desconcatenar = () =>{
    return ObtenerTextoPantalla().split(/x|-|\/|%|\+/);
}

const RealizarOperacion = (pantalla) => {
    try
    {
        pantalla = pantalla.replace(/x/g, "*");
        pantalla = pantalla.replace(/(\d)\(/g, "$1*(");

        let result = eval(pantalla.replace (/x/g, "*"));
        document.querySelector("#pantalla").textContent = result;
    }
    catch(Error)
    {
        document.querySelector("#pantalla").textContent = "Syntaxis Error";
    }
}

//#region Color Manage
const button = document.getElementById("but-changeTheme");

// Escucha el evento click
button.addEventListener("click", () => {
    const root = document.documentElement; // Selecciona :root
    
    const currentBg = getComputedStyle(root).getPropertyValue("--button-color").trim();

    if (currentBg === "orange") 
    {
        root.style.setProperty("--button-color", "purple");
        root.style.setProperty("--number-color", "black");
        root.style.setProperty("--text-color", "white");
        root.style.setProperty("--button-color-hover", "rgba(63, 0, 63, 0.986)");
        root.style.setProperty("--number-color-hover", "rgb(44, 44, 44)");
        root.style.setProperty("--bg-color", "linear-gradient(to right, #bdc3c7, #2c3e50)");
        document.querySelector("#but-changeTheme").textContent = "☀️" ;
    } 
    else 
    {
        root.style.setProperty("--button-color", "orange");
        root.style.setProperty("--number-color", "white");
        root.style.setProperty("--text-color", "black");
        root.style.setProperty("--button-color-hover", " rgb(255, 115, 0)");
        root.style.setProperty("--number-color-hover", "rgb(204, 204, 204)");
        root.style.setProperty("--bg-color", "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)");
        document.querySelector("#but-changeTheme").textContent = "🌙" ;
    }
})
//#endregion