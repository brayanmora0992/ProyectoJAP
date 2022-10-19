const direccion = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let listaProductos = document.getElementById('listaProductos')
let carrito = [];

function mostrarItems(arreglo){
    for (let i = 0; i < arreglo.articles.length; i++) {
        listaProductos.innerHTML += 
        `<tr>
            <td class="col-2"><img src="${arreglo.articles[i].image}" class="img-thumbnail"</td>
            <td>${arreglo.articles[i].name}</td>
            <td>${arreglo.articles[i].currency} <span class="costoUnitario">${arreglo.articles[i].unitCost}</span></td>
            <td><input class="form-control cantidades" type="number" onchange="calcular()" value="${arreglo.articles[i].count}" id="cantidad" min="0"></td>
            <td><strong><span class="tipoCambio">${arreglo.articles[i].currency}</span> <span class="subtotales">${arreglo.articles[i].unitCost}</span></strong></td>
        </tr>` 
    }
}

function traerProductoLocalStorage(){
    carrito = JSON.parse(localStorage.getItem('Producto'))
    mostrarProductosAgregadosAlCarrito(carrito)
}

function mostrarProductosAgregadosAlCarrito(producto){
    for (let i = 0; i < producto.length; i++) {
        listaProductos.innerHTML += 
        `<tr>
            <td class="col-2"><img src="${producto[i].images[0]}" class="img-thumbnail"</td>
            <td>${producto[i].name}</td>
            <td>${producto[i].currency} <span class="costoUnitario">${producto[i].cost}</span></td>
            <td><input class="form-control cantidades" type="number" onchange="calcular()" value="1" id="cantidad" min="0"></td>
            <td><strong><span class="tipoCambio">${producto[i].currency}</span> <span class="subtotales">${producto[i].cost}</span></strong></td>
        </tr>` 
        
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

document.addEventListener("DOMContentLoaded", () => {
    fetch(direccion)
    .then(response => response.json())
    .then(items => {
        mostrarItems(items)
        traerProductoLocalStorage()
        calcular()
    })

    document.getElementById('express').addEventListener('click', ()=>{
        calcular()
    })
    document.getElementById('premium').addEventListener('click', ()=>{
        calcular()
    })
    
});
