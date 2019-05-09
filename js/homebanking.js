// Declaración de variables
var nombreUsuario = 'Alex Robaina';
var saldoCuenta = 42000;
var saldoAnterior = Number;
var limiteExtraccion = 6000;
var codigoSeguridad = '1234';
var cuenta1 = '1234567';
var cuenta2 = '7654321';

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
        alert('Ingrese un monto válido');
        return;
    }
    if (dineroExtraccion > saldoCuenta) {
        alert('No tienes suficientes fondos');
        return;
    } 
    if (dineroExtraccion > limiteExtraccion) {
        alert('El monto ingresado sobrepasa el limite de extraccion');
        return;
    } else if (dineroExtraccion % 100 != 0) {
        alert('Solo entregamos billetes de 100');
        return;
    } else {
        
        
        saldoAnterior = saldoCuenta

        restarSaldo(dineroExtraccion);

        alert('Has retirado: ' + dineroExtraccion + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Saldo actual: ' + saldoCuenta);
    }
    
    actualizarSaldoEnPantalla();

}

function depositarDinero() {
    var dineroDepositado = parseInt(prompt('Ingrese el monto que quiere depositar!'));

    if (! dineroDepositado || dineroDepositado <= 0) {
        alert('Ingrese un monto valido');
        return;
    }

    saldoAnterior = saldoCuenta

    sumaSaldo(dineroDepositado);

    alert('Has depositado: ' + dineroDepositado + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Saldo actual: ' + saldoCuenta);

    actualizarSaldoEnPantalla();
}

function pagarServicio() {

    var pagarServicio = parseInt(prompt('Ingresa el numero que corresponde al servicio que quieres pagar' + newLine + '1 - Agua' + newLine + '2 - Luz' + newLine + '3 - Internet' + newLine + '4 - Teléfono'));

    if (saldoCuenta < agua || saldoCuenta < telefono || saldoCuenta < luz || saldoCuenta < internet) {
        alert('Su saldo no es suficiente!');
    } else {
        switch (pagarServicio) {
            case 1: 
            saldoAnterior = saldoCuenta
            restarSaldo(agua);
                break;
            case 2: 
            saldoAnterior = saldoCuenta
            restarSaldo(luz);
                break;
            case 3: 
            saldoAnterior = saldoCuenta
            restarSaldo(internet);
                break;
            case 4: 
            saldoAnterior = saldoCuenta
            restarSaldo(telefono);
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
    
        var cuentaElegida = parseInt(prompt('¿Seleccione el numero asignado de cuenta?' + newLine + 'Cuenta 1 - ' + cuenta1 + newLine + 'Cuenta 2 - ' + cuenta2));
        
        switch (cuentaElegida) {
            case 1: restarSaldo(montoDeTransferencia);
                    alert('Se han transferido $' + montoDeTransferencia + newLine + 'Cuenta seleccionada: ' + cuenta1)
                break;
            case 2: restarSaldo(montoDeTransferencia);
                    alert('Se han transferido $' + montoDeTransferencia + newLine + 'Cuenta seleccionada: ' + cuenta2)
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

    saldoAnterior = saldoCuenta
    sumaSaldo(montoDelCheque);

    alert('Saldo anterior: ' + saldoAnterior + newLine + 'Monto del cheque: ' + montoDelCheque + newLine + 'Saldo actual: ' + saldoCuenta + newLine + 'Numero de cheque: ' + numeroCheque);

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
        alert('Has pagado el servicio del agua!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + agua + newLine + 'Saldo actual: ' + saldoCuenta);
    } 
    if (servicio === 2) {
        alert('has pagado el servicio del luz!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + luz + newLine + 'Saldo actual: ' + saldoCuenta);
    } 
    if (servicio === 3) {
        alert('has pagado el servicio del internet!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + internet + newLine + 'Saldo actual: ' + saldoCuenta);
    }
    if (servicio === 4) {
        alert('has pagado el servicio del telefono!' + newLine + 'Saldo anterior: ' + saldoAnterior + newLine + 'Dinero descontado: ' + telefono + newLine + 'Saldo actual: ' + saldoCuenta);
    }
}

function sumaSaldo(dinero) {
    saldoCuenta = dinero + saldoCuenta;
}

function restarSaldo(dinero) {
    saldoCuenta = saldoCuenta - dinero;
}
