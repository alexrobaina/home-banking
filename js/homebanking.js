// Declaración de variables
var nombreUsuario = 'Alex Robaina';
var saldoCuenta = 42000;
var limiteExtraccion = 6000;
var saldoAnterior = saldoCuenta;
var codigoSeguridad = 1234;

var newLine = '\n';

// variables de serivios
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;

// Cuentas amigas
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;

// Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
};

// Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
   
    var nuevoLimiteDeExtraccion = prompt('Ingrese nuevo limite de extracción!');
    console.log(nuevoLimiteDeExtraccion + 'log1');
    
    if (nuevoLimiteDeExtraccion === '' || nuevoLimiteDeExtraccion === null) {
        console.log(nuevoLimiteDeExtraccion + 'log2');
        swal('Importante', 'Tienes que ingresar un monto', 'warning');
        return;
    } else if (isNaN(nuevoLimiteDeExtraccion) === true) {
        console.log(nuevoLimiteDeExtraccion + 'log3');
        swal('Error', 'Ingrese un monto', 'error');
        return;
    } else if (nuevoLimiteDeExtraccion <= 0) {
        console.log(nuevoLimiteDeExtraccion + 'log4');
        swal('Error', 'Monto no permitido', 'error');
        return;
    } else {
        limiteExtraccion = nuevoLimiteDeExtraccion;    
        swal('Importante', `Su nuevo limite de extracción es: ${limiteExtraccion}`, 'success');
    }

    actualizarLimiteEnPantalla();
}

function extraerDinero() {
    var stringExtraccion = prompt('Ingrese el monto que quiere extraer!');

    validacinDelPrompt(stringExtraccion);
    var extraccion = parseInt(stringExtraccion);

    validaNumeroNegativo(extraccion);
    if (extraccion > saldoCuenta) {
        swal('Importante', 'No tienes suficientes fondos', 'warning');
        return;
    }
    if (extraccion >= limiteExtraccion) {
        swal('Ingrese otro monto', 'Excedes el limite de extracción', 'warning');
    }

    if (extraccion % 100 != 0) {
        swal('Importante', 'Solo entregamos billetes de 100', 'warning');
    } else {
        restarSaldo(extraccion);

        swal('Estado de cuenta', `Saldo anterior: ${saldoAnterior} ${newLine} Dinero extraido ${extraccion} ${newLine} Tu saldo actual es: ${saldoCuenta}`, 'success');
    }
    actualizarSaldoEnPantalla();
}

function depositarDinero() {
    var stringDeposito = prompt('Ingrese el monto que quiere depositar!');

    validacinDelPrompt(stringDeposito);

    var deposito = parseInt(stringDeposito);
    validaNumeroNegativo(deposito);

    sumaSaldo(deposito);

    swal('Estado de cuenta', `Saldo anterior: ${saldoAnterior} ${newLine} Depositaste ${deposito} ${newLine} Tu saldo actual es: ${saldoCuenta}`, 'success');

    actualizarSaldoEnPantalla();
}

function pagarServicio() {
    var stringPagarServicio = prompt('Ingresa el numero que corresponde al servicio que quieres pagar' + newLine + '1 - Agua' + newLine + '2 - Luz' + newLine + '3 - Internet' + newLine + '4 - Teléfono');

    pagar = parseInt(stringPagarServicio);

    if (saldoCuenta < agua || saldoCuenta < telefono || saldoCuenta < luz || saldoCuenta < internet) {
        swal('Importante', 'Su saldo no es suficiente!', 'warning');
    } else {
        switch (pagar) {
            case 1: restarSaldo(agua);
                break;
            case 2: restarSaldo(luz);
                break;
            case 3: restarSaldo(internet);
                break;
            case 4: restarSaldo(telefono);
                break;
            default:
                // alert('Selecciona un servicio');
                swal('Tienes que elegir un servicio!', 'Intenta de nuevo!', 'warning');
        }
    }

    mensajeServicio();

    actualizarSaldoEnPantalla();
}

function transferirDinero() {
    stringmontoDeTransferencia = prompt('Ingrese el monto que desea transferir');

    validacinDelPrompt(stringmontoDeTransferencia);
    var montoDeTransferencia = parseInt(stringmontoDeTransferencia);

    validaNumeroNegativo(montoDeTransferencia);

    if (montoDeTransferencia > saldoCuenta) {
        swal('Importante', 'No tienes suficientes fondos para transferir', 'warning');
    } else {
        stringCuentaElegida = prompt(`¿Seleccione el numero asignado de cuenta? ${newLine} Cuenta 1 - 1234567 ${newLine} Cuenta 2 - 7654321`);
        cuentaElegida = parseInt(stringCuentaElegida);
        switch (cuentaElegida) {
            case 1: restarSaldo(montoDeTransferencia);
                break;
            case 2: restarSaldo(montoDeTransferencia);
                break;
            default:
                swal('Error', 'Solo tiene 2 cuentas amigas, seleccione entre la cuenta 1 y la cuenta 2', 'error');
        }
    }

    actualizarSaldoEnPantalla();
}

function iniciarSesion() {
    stringCodigoUsuario = prompt('Ingrese su codigo de seguridad');

    if (stringCodigoUsuario.length != 4) {
        swal('Codigo incorrecto!', `El dinero fué retenido por seguridad`, 'error');
        end();
    }
    codigoUsuario = parseInt(stringCodigoUsuario);

    if (codigoUsuario === codigoSeguridad) {
        swal('Bienvenido/a!', `${nombreUsuario} ya puedes comenzar a realizar operaciones`, 'success');
    } else {
        saldoCuenta = 0;
        swal('Codigo incorrecto!', `El dinero fué retenido por seguridad`, 'error');
    }
}

function depositarCheques() {
    stringNumeroCheque = prompt('Ingrese el numero de cheque');

    if (stringNumeroCheque === '' || stringNumeroCheque === null) {
        swal('Error', 'Ingrese numero de cheque valido', 'error');
        end();
    }

    var numeroCheque = parseInt(stringNumeroCheque);

    stringMontoDelCheque = prompt('Ingrese el monto del cheque');
    validacinDelPrompt(stringMontoDelCheque);
    var montoDelCheque = parseInt(stringMontoDelCheque);

    validaNumeroNegativo(numeroCheque);
    validaNumeroNegativo(montoDelCheque);

    sumaSaldo(montoDelCheque);

    swal('Estado de cuenta', `Saldo anterior: ${saldoAnterior} ${newLine} Depositaste ${montoDelCheque} ${newLine} Tu saldo actual es: ${saldoCuenta} ${newLine} El numero de cheque: ${numeroCheque}`, 'success');

    actualizarSaldoEnPantalla();
}

// Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById('nombre').innerHTML = 'Bienvenido/a ' + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById('saldo-cuenta').innerHTML = '$' + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById('limite-extraccion').innerHTML = 'Tu límite de extracción es: $' + limiteExtraccion;
}

/*=======================================
 Nuevas funciones
=========================================*/

function mensajeServicio() {
    if (pagar === 1) {
        alert('has pagado el servicio del agua!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + agua + newLine + 'Dinero disponible: ' + saldoCuenta);
    }
    if (pagar === 2) {
        alert('has pagado el servicio del luz!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + luz + newLine + 'Dinero disponible: ' + saldoCuenta);
    }
    if (pagar === 3) {
        alert('has pagado el servicio del telefono!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + telefono + newLine + 'Dinero disponible: ' + saldoCuenta);
    }
    if (pagar === 4) {
        alert('has pagado el servicio del internet!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + internet + newLine + 'Dinero disponible: ' + saldoCuenta);
    }
}

function sumaSaldo(dinero) {
    saldoCuenta = dinero + saldoCuenta;
}

function restarSaldo(dinero) {
    saldoCuenta = saldoCuenta - dinero;
}

function validaNumeroNegativo(numero) {

}

function validacinDelPrompt(string) {
    if (string === '' || string === null) {
        swal('Importante', 'Tienes que ingresar un monto', 'warning');
    }
}
