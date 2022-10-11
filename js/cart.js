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
            <td><strong>${arreglo.articles[i].currency} <span class="subtotales">${arreglo.articles[i].unitCost}</span></strong></td>
        </tr>` 
    }
}

function mostrarProductosAgregadosAlCarrito(producto){
    listaProductos.innerHTML += 
    `<tr>
        <td class="col-2"><img src="${producto.images[0]}" class="img-thumbnail"</td>
        <td>${producto.name}</td>
        <td>${producto.currency} <span class="costoUnitario">${producto.cost}</span></td>
        <td><input class="form-control cantidades" type="number" onchange="calcular()" value="1" id="cantidad" min="0"></td>
        <td><strong>${producto.currency} <span class="subtotales">${producto.cost}</span></strong></td>
    </tr>` 
}

function calcular(){
    let costoUnitario = document.getElementsByClassName('costoUnitario');
    let subtotales = document.getElementsByClassName('subtotales');
    let cantidades = document.getElementsByClassName('cantidades')
    let valorTotal = 0;
    let subtotalIndividual = 0;
    
    for (let i = 0; i < costoUnitario.length; i++) {
        subtotalIndividual += parseInt(costoUnitario[i].innerHTML) * parseInt(cantidades[i].value)
        subtotales[i].innerHTML = parseInt(costoUnitario[i].innerHTML) * parseInt(cantidades[i].value)
        valorTotal += parseInt(subtotales[i].innerHTML)
        
        document.getElementById('total').innerHTML = `Valor total: <strong>${valorTotal}</strong>`
        
        
    }
}

function traerProductoLocalStorage(){
    carrito = JSON.parse(localStorage.getItem('Producto'))
    mostrarProductosAgregadosAlCarrito(carrito)
}




document.addEventListener("DOMContentLoaded", () => {
    fetch(direccion)
    .then(response => response.json())
    .then(items => {
        mostrarItems(items)
        traerProductoLocalStorage()
        calcular()
    })
    
});
