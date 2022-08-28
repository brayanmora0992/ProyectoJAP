document.addEventListener('DOMContentLoaded', ()=>{
    const categoria = localStorage.getItem('catID')
    const productos = `https://japceibal.github.io/emercado-api/cats_products/${categoria}.json`;
    let contenido = document.getElementById('contenido');
    let encabezado = document.getElementById('encabezado');
    fetch(productos)
        .then(response => response.json())
        .then(datos => {
            /*Un bucle for que recorre el array productos y agrega contenido HTML al elemento contenido*/

            for (let i = 0; i < datos.products.length; i++) {
            /*escribo en el HTML un título con el nombre de la categoría y cambio el párrafo para que coincida con el nombre de la categoría seleccionada*/
                encabezado.innerHTML = `<h3>${datos.catName}</h3>
                                        <p>Verás aquí todos los productos de la categoría ${datos.catName}</p>` 
                contenido.innerHTML += `
                        <div class="col-md-4">
                            <div class="card mb-4 shadow p-3 mb-3 bg-body rounded border-0 zoom">
                                <img class="card-img-top rounded-2" src="${datos.products[i].image}" alt="fotoauto" style="height: 100%; width: 100%; display: block;">
                                <div class="card-body">
                                    <div class="d-flex flex-row justify-content-between">
                                        <p class="card-text fw-bolder">${datos.products[i].name} - ${datos.products[i].currency} ${datos.products[i].cost}</p>
                                        <small class="text-muted">${datos.products[i].soldCount} vendidos</small>
                                    </div>
                                    <p class="card-text">${datos.products[i].description}</p>
                                </div>        
                            </div>
                        </div>`
                
            }
        })
});