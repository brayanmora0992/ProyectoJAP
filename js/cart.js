const direccion = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let listaProductos = document.getElementById('listaProductos')
let resultado = "";

function mostrarItems(arreglo){
    for (let i = 0; i < arreglo.articles.length; i++) {
        listaProductos.innerHTML += 
        `<tr>
            <td class="col-2"><img src="${arreglo.articles[i].image}" class="img-thumbnail"</td>
            <td>${arreglo.articles[i].name}</td>
            <td>${arreglo.articles[i].currency} ${arreglo.articles[i].unitCost}</td>
            <td><input class="form-control" type="number" onchange="calcular(${arreglo.articles[i].unitCost})" value="${arreglo.articles[i].count}" id="cantidad" min="0"></td>
            <td id="subtotal"><strong>${arreglo.articles[i].currency} ${arreglo.articles[i].unitCost}</strong></td>
        </tr>` 
    }
}

function calcular(monto){
    let cantidad = parseInt(document.getElementById('cantidad').value);
    resultado = cantidad * monto;
    document.getElementById('subtotal').innerHTML = `<strong>USD ${resultado}</strong>`
}

document.addEventListener("DOMContentLoaded", () => {
    fetch(direccion)
    .then(response => response.json())
    .then(items => {
        console.log(items)
        mostrarItems(items)
        
    })
    
});
