const inputMensaje = document.querySelector("#mensaje");
const inputResultado = document.querySelector("#resultado");

const btnEncriptar = document.querySelector("#encriptar");
const btnDesencriptar = document.querySelector("#desencriptar");
const muñeco = document.querySelector("#imagen");
const h3 = document.querySelector("#h3");
const parrafo = document.querySelector("#parrafo");
const btnCopiar = document.querySelector("#copiar");
const btnEscuchar = document.querySelector("#escuchar");

const contenedorErrores = document.querySelector(".contenedor-errores");

function validarMensaje () {
    // Borrar errores previos
    let erroresPrevios = contenedorErrores.querySelectorAll(".error");
    for (let err of erroresPrevios) {
        console.log(err);
        contenedorErrores.removeChild(err);
    }
    var mensaje = inputMensaje.value;
    let letrasValidas = "abcdefghijklmnñopqrstuvwxyz ";
    let mensajeError = document.createDocumentFragment();
    for (let letra of mensaje) {
        if(!letrasValidas.includes(letra)) {
            let p = document.createElement("p");
            p.setAttribute("class", "error");
            p.textContent =  `La letra ${letra} no es válida`;
            mensajeError.appendChild(p);  
        }
    }
    contenedorErrores.appendChild(mensajeError);
    if(mensajeError.children.length === 0) {  //Si la longitud es cero, quiere decir que no hay error y retornamos a true
        return true;
    }
    return false; //Si el mensaje es diferente de cero retorna false: Es como un else, sin ser else
}

function encriptar() {
    ocultarAdelante();
    if (!validarMensaje()) return; //Si el mensaje no es válido, vamos a retornar para que no haga la encriptacion
    var mensaje = inputMensaje.value;
    var mensajeEncriptado = mensaje
    .replaceAll("e","enter")
    .replaceAll("i","imes")
    .replaceAll("o","ober")
    .replaceAll("a","ai")
    .replaceAll("u","ufat");
    
    inputResultado.value = mensajeEncriptado;

}

function desencriptar() {
    ocultarAdelante();
    if (!validarMensaje()) return; //Si el mensaje no es válido, vamos a retornar para que no haga la encriptacion
    var mensajeEncriptado = inputMensaje.value;
    var mensaje = mensajeEncriptado
    .replaceAll("enter","e")
    .replaceAll("imes","i")
    .replaceAll("ober","o")
    .replaceAll("ai","a")
    .replaceAll("ufat","u");

    inputResultado.value = mensaje;
}

function copiar() {
    var mensajeEncriptado = inputResultado.value;
    navigator.clipboard.writeText(mensajeEncriptado);
    inputMensaje.value = "";
    inputMensaje.focus();
}

function escuchar() {
    var mensajeEncriptado = inputResultado.value;
    let msg = new SpeechSynthesisUtterance();
    msg.text = mensajeEncriptado;
    msg.lang = "es-Es";
    window.speechSynthesis.speak(msg);
}

function ocultarAdelante() {
    muñeco.classList.add("ocultar");
    h3.classList.add("ocultar");
    parrafo.classList.add("ocultar");
}

btnEncriptar.onclick = encriptar;

btnDesencriptar.onclick = desencriptar;

btnCopiar.onclick = copiar;

btnEscuchar.onclick = escuchar;