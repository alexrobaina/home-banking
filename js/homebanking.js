// Declaración de variables
var nombreUsuario = 'Alex Robaina';
var saldoCuenta = 42000;
var limiteExtraccion = 6000;
var saldoAnterior = saldoCuenta;
var codigoSeguridad = "1234";

var newLine = '\n';

// variables de serivios
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;


// Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
};

// Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
   
    var nuevoLimiteDeExtraccion = parseInt(prompt('Ingrese nuevo limite de extracción!'));
    console.log(nuevoLimiteDeExtraccion);

    if (! nuevoLimiteDeExtraccion || nuevoLimiteDeExtraccion <= 0) {
        
        alert('Ingrese un monto valido');
        return;
    } else {
        limiteExtraccion = nuevoLimiteDeExtraccion;    
        alert('Su nuevo limite de extracción es: ' + limiteExtraccion);
    }

    actualizarLimiteEnPantalla();
}

function extraerDinero() {
    var dineroExtraccion = parseInt(prompt('Ingrese el monto que quiere extraer!'));

    if (! dineroExtraccion || dineroExtraccion <= 0) {
        alert('Ingrese un monto valido');
        return;
    }
     if (dineroExtraccion > saldoCuenta) {
        alert('No tienes suficientes fondos');
        return;
    } 
     if (dineroExtraccion > limiteExtraccion) {
        alert('Sobrepasa el limite de extraccion');
        return;
    } else if (dineroExtraccion % 100 != 0) {
        alert('Solo entregamos billetes de 100');
        return;
    } else {
        restarSaldo(dineroExtraccion);
        alert('Saldo anterior: ' + saldoAnterior + newLine + 'Dinero extraido: ' + dineroExtraccion + newLine + 'Tu saldo actual es: ${saldoCuenta}');
    }
    
    actualizarSaldoEnPantalla();

}

function depositarDinero() {
    var dineroDepositado = parseInt(prompt('Ingrese el monto que quiere depositar!'));

    if (! dineroDepositado || dineroDepositado <= 0) {
        alert('Ingrese un monto valido');
        return;
    }

    sumaSaldo(dineroDepositado);

    alert('Saldo anterior: ' + saldoAnterior + newLine + 'Depositaste: ' + dineroDepositado + newLine + 'Tu saldo actual es: ' + saldoCuenta);

    actualizarSaldoEnPantalla();
}

function pagarServicio() {

    var pagarServicio = parseInt(prompt('Ingresa el numero que corresponde al servicio que quieres pagar' + newLine + '1 - Agua' + newLine + '2 - Luz' + newLine + '3 - Internet' + newLine + '4 - Teléfono'));

    if (saldoCuenta < agua || saldoCuenta < telefono || saldoCuenta < luz || saldoCuenta < internet) {
        alert('Su saldo no es suficiente!');
    } else {
        switch (pagarServicio) {
            case 1: restarSaldo(agua);
                break;
            case 2: restarSaldo(luz);
                break;
            case 3: restarSaldo(internet);
                break;
            case 4: restarSaldo(telefono);
                break;
            default:
                alert('Selecciona un servicio');
        }
    }

    mensajeServicio(pagarServicio);

    actualizarSaldoEnPantalla();
}

function transferirDinero() {
    var montoDeTransferencia = parseInt(prompt('Ingrese el monto que desea transferir'));

    if (! montoDeTransferencia || montoDeTransferencia <= 0) {
        alert('Ingrese un monto valido');
        return;
    }

    if (montoDeTransferencia > saldoCuenta) {
        alert('No tienes suficientes fondos para transferir');
    } else {
    
        var cuentaElegida = parseInt(prompt('¿Seleccione el numero asignado de cuenta?' + newLine + 'Cuenta 1 - 1234567' + newLine + 'Cuenta 2 - 7654321'));
        
        switch (cuentaElegida) {
            case 1: restarSaldo(montoDeTransferencia);
                break;
            case 2: restarSaldo(montoDeTransferencia);
                break;
            default:
                alert('Solo tiene 2 cuentas amigas, seleccione entre la cuenta 1 y la cuenta 2');
        }
    }

    actualizarSaldoEnPantalla();
}

function iniciarSesion() {
    var codigoUsuario = prompt('Ingrese su codigo de seguridad');

    if (codigoUsuario === codigoSeguridad) {
        alert('Bienvenido/a! ' + nombreUsuario + 'ya puedes comenzar a realizar operaciones');
    } else {
        saldoCuenta = 0;
        alert('El dinero fué retenido por seguridad');
    }
}

function depositarCheques() {
    var numeroCheque = parseInt(prompt('Ingrese el numero de cheque'));

    if (! numeroCheque || numeroCheque <= 0) {
        alert('Ingrese un numero valido');
        return;
    }

    var montoDelCheque = parseInt(prompt('Ingrese el monto del cheque'));
   
    if (montoDelCheque === '' || montoDelCheque === null || montoDelCheque <= 0 || isNaN(montoDelCheque) === true) {
        alert('Ingrese un monto valido');
        return;
    }

    sumaSaldo(montoDelCheque);

    alert('Saldo anterior: ' + saldoAnterior + newLine + 'Depositaste: ' + montoDelCheque + newLine + 'Tu saldo actual es: ' + saldoCuenta + newLine + 'El numero de cheque: ' + numeroCheque);

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

function mensajeServicio(servicio) {
    if (servicio === 1) {
        alert('has pagado el servicio del agua!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + agua + newLine + 'Dinero disponible: ' + saldoCuenta);
    } 
    if (servicio === 2) {
        alert('has pagado el servicio del luz!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + luz + newLine + 'Dinero disponible: ' + saldoCuenta);
    } 
    if (servicio === 3) {
        alert('has pagado el servicio del internet!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + internet + newLine + 'Dinero disponible: ' + saldoCuenta);
    }
    if (servicio === 4) {
        alert('has pagado el servicio del telefono!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + telefono + newLine + 'Dinero disponible: ' + saldoCuenta);
    }
}

function sumaSaldo(dinero) {
    saldoCuenta = dinero + saldoCuenta;
}

function restarSaldo(dinero) {
    saldoCuenta = saldoCuenta - dinero;
}
