const direccion = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let itemsCarrito = ""
let costo = "";
let id = ""
let resultado = 0;
let articulos = [];

function calcular(){
    cantidad = parseInt(document.getElementById(id).value);
    res = cantidad * costo;
    return res
}


// function agregar(){
//     articulos.push({
//         "id": 545424,
// "name": "HONDA",
// "count": 1,
// "unitCost": 154545400,
// "currency": "USD",
// "image": "img/prod50924_1.jpg"
//     })
// }

// document.getElementById('btn').addEventListener('click', ()=>{
//     agregar()
// })

document.addEventListener('DOMContentLoaded', ()=>{
    fetch(direccion)
    .then(response => response.json())
    .then(info => {
        articulos = info.articles;
        
        for (let i = 0; i < articulos.length; i++) {
            id = i
            costo = articulos[i].unitCost
            itemsCarrito = 
            `
            <tr>
                <td class="col-2"><img src="${articulos[i].image}" style="width:50%"></td>
                <td>${articulos[i].name}</td>
                <td>${articulos[i].currency} ${articulos[i].unitCost}</td>
                <td><input class="form-control" type="number" name="valor" value="1" min="0"></td>
                <td class="table-primary">${articulos[i].currency} <span id="${id}">${articulos[i].unitCost}</span></td>
            </tr>`

            // document.getElementById(id).addEventListener('change', ()=>{
            //     calcular()
            //     console.log(res)
            
            // }) 
        };
        document.getElementById('listaProductos').innerHTML += itemsCarrito;

    })

});
