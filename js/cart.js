const direccion = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const formularios = document.querySelectorAll('.needs-validation')
let listaProductos = document.getElementById('listaProductos')
let transfBancaria = document.getElementById('transfbancaria');
let tarjetaCredito = document.getElementById('tarjetaCredito');
let medioPagoSelec = document.getElementById('medioPagoSelec');
let campoNumTarjeta = document.getElementById('num');
let codigoSeg = document.getElementById('codigo');
let vencimiento = document.getElementById('vencimiento');
let campoNumCuenta = document.getElementById('numCuenta');
let btnBorrar = document.getElementsByClassName('borrar');
let arregloConvertido = {};
let carrito = [];

function verificarCamposModal(){
    let validity = true;
    if (!campoNumTarjeta.checkValidity() || !vencimiento.checkValidity() || !codigoSeg.checkValidity() || !transfBancaria.checkValidity()) {
        campoNumCuenta.setCustomValidity(false)
        validity = false;

    }
}

function mostrarItems(arreglo){
    for (let i = 0; i < arreglo.articles.length; i++) {
        let articulosCarrito = "";
        articulosCarrito += 
        `<tr>
            <td class="col-2"><img src="${arreglo.articles[i].image}" class="img-thumbnail"</td>
            <td>${arreglo.articles[i].name}</td>
            <td>${arreglo.articles[i].currency} <span class="costoUnitario">${arreglo.articles[i].unitCost}</span></td>
            <td><input class="form-control cantidades" type="number" onchange="calcular()" value="${arreglo.articles[i].count}" id="cantidad" min="1"></td>
            <td><strong><span class="tipoCambio">${arreglo.articles[i].currency}</span> <span class="subtotales">${arreglo.articles[i].unitCost}</span></strong></td>
            <td><button class="btn btn-danger borrar"><i class="fas fa-trash-alt"></i></button></td>
        </tr>` 

        listaProductos.innerHTML = articulosCarrito;
    }
}

//Función para modificar el arreglo al que se le hace fetch, la razón es para integrarlo luego en el arreglo "carrito"
function convertir(arreglo){
    let images = [];
    images.push(arreglo.articles[0].image);
    arregloConvertido.name = arreglo.articles[0].name
    arregloConvertido.cost = arreglo.articles[0].unitCost
    arregloConvertido.currency = arreglo.articles[0].currency
    arregloConvertido.images = images;
}

function borrarArticulo(indice){
    carrito.splice(indice, 1)
    mostrarProductosAgregadosAlCarrito(carrito);

}

function traerProductoLocalStorage(){
    carrito = JSON.parse(localStorage.getItem('Producto'))
    carrito.unshift(arregloConvertido)
    mostrarProductosAgregadosAlCarrito(carrito)
    
}


function mostrarProductosAgregadosAlCarrito(producto){
    let articulosCarrito = "";
    for (let i = 0; i < producto.length; i++) {
        articulosCarrito += 
        `<tr>
            <td class="col-2"><img src="${producto[i].images[0]}" class="img-thumbnail"</td>
            <td>${producto[i].name}</td>
            <td>${producto[i].currency} <span class="costoUnitario">${producto[i].cost}</span></td>
            <td><input class="form-control cantidades" type="number" onchange="calcular()" value="1" id="cantidad" min="1"></td>
            <td><strong><span class="tipoCambio">${producto[i].currency}</span> <span class="subtotales">${producto[i].cost}</span></strong></td>
            <td><button class="btn btn-danger borrar"><i class="fas fa-trash-alt"></i></button></td>
        </tr>` 
    }

    listaProductos.innerHTML = articulosCarrito;
    calcular()
    
    for (let x = 0; x < btnBorrar.length; x++) {
        btnBorrar[x].addEventListener('click', ()=>{
            borrarArticulo(x)
        })
    }
}

function calcular(){
    let costoUnitario = document.getElementsByClassName('costoUnitario');
    let subtotales = document.getElementsByClassName('subtotales');
    let cantidades = document.getElementsByClassName('cantidades');
    let tipoCambio = document.getElementsByClassName('tipoCambio');
    let valorEnvio = document.getElementById('valorEnvio');
    let valorSubtotal = 0;
    let costoEnvio = 0

    for (let i = 0; i < costoUnitario.length; i++) {
        subtotales[i].innerHTML = parseInt(costoUnitario[i].innerHTML) * parseInt(cantidades[i].value)
    }

    for (let x = 0; x < tipoCambio.length; x++) {
        if (tipoCambio[x].innerHTML !== "USD") {
            valorSubtotal += (parseInt(costoUnitario[x].innerHTML) / 40) * parseInt(cantidades[x].value)
        } else {
            valorSubtotal += (parseInt(costoUnitario[x].innerHTML)) * parseInt(cantidades[x].value)
            
        }
        
        document.getElementById('total').innerHTML = `USD ${Math.round(valorSubtotal)}</strong>`
        // evalúo que envío está seleccionado
        if (document.getElementById('standard').checked) {
            costoEnvio = valorSubtotal * 0.05
            valorEnvio.innerHTML = `USD ${Math.round(costoEnvio)}`
            document.getElementById('costoTotal').innerHTML = `<strong>USD ${Math.round(valorSubtotal + costoEnvio)}</strong>`;

        } else if (document.getElementById('express').checked){
            costoEnvio = valorSubtotal * 0.07
            valorEnvio.innerHTML = `USD ${Math.round(costoEnvio)}`
            document.getElementById('costoTotal').innerHTML = `<strong>USD ${Math.round(valorSubtotal + costoEnvio)}</strong>`;

        } else {
            costoEnvio = valorSubtotal * 0.15
            valorEnvio.innerHTML = `USD ${Math.round(costoEnvio)}`
            document.getElementById('costoTotal').innerHTML = `<strong>USD ${Math.round(valorSubtotal + costoEnvio)}</strong>`;

        }

    }

}

function mostrarMedioDePago(){

    if (transfBancaria.checked) {
        medioPagoSelec.innerHTML = 'Transferencia bancaria';
    } else if (tarjetaCredito.checked){
        medioPagoSelec.innerHTML = 'Tarjeta de crédito';  
   
    }
}

function deshabilitarInputs(){

    if (transfBancaria.checked) {
        campoNumTarjeta.disabled = true;
        codigoSeg.disabled = true; 
        vencimiento.disabled = true;
        campoNumCuenta.disabled = false;
    } else if (tarjetaCredito.checked){
        campoNumCuenta.disabled = true;   
        campoNumTarjeta.disabled = false;
        codigoSeg.disabled = false; 
        vencimiento.disabled = false;   
    }
}


document.addEventListener("DOMContentLoaded", () => {
    Array.prototype.slice.call(formularios)
    .forEach(function (formularios) {
      formularios.addEventListener('submit', function (event) {
        if (!formularios.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          verificarCamposModal()
        } 

        formularios.classList.add('was-validated')
      }, false)
    })

    fetch(direccion)
    .then(response => response.json())
    .then(items => {
        convertir(items)
        if (localStorage.getItem('Producto')===null) {
            mostrarItems(items)
        } else {
            traerProductoLocalStorage()
        }
        calcular()
    })

    document.getElementById('express').addEventListener('click', ()=>{
        calcular()
    })
    document.getElementById('premium').addEventListener('click', ()=>{
        calcular()
    })

    document.getElementById('transfbancaria').addEventListener('click', ()=>{
        deshabilitarInputs()
    })

    document.getElementById('tarjetaCredito').addEventListener('click', ()=>{
        deshabilitarInputs()
    })
    
    document.getElementById('cerrar').addEventListener('click',()=>{
        mostrarMedioDePago()
    })

    
});
