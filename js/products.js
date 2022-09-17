//funcion para guardar el ID del producto en el localstorage
function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}


document.addEventListener('DOMContentLoaded', ()=>{
    const categoria = localStorage.getItem('catID');
    const productos = `https://japceibal.github.io/emercado-api/cats_products/${categoria}.json`;
    let contenido = document.getElementById('contenido');
    let encabezado = document.getElementById('encabezado');
    let btnFiltro = document.getElementById('rangeFilterCount');
    let btnLimpiar = document.getElementById('clearRangeFilter');
    let btnAscendente = document.getElementById('sortAsc');
    let btnDescendente = document.getElementById('sortDesc');
    let btnRelevancia = document.getElementById('sortByCount');
    /* deshabilitado hasta futuro update
    let buscador = document.getElementById('buscador');
    let campoBuscar = document.getElementById('campoBuscar').value;*/



    fetch(productos)
        .then(response => response.json())
        .then(datos => {
            /*Un bucle for que recorre el array productos y agrega código HTML al elemento contenido*/
            for (let i = 0; i < datos.products.length; i++) {
            /*escribo en el HTML un título con el nombre de la categoría y cambio el párrafo para que coincida con el nombre de la categoría seleccionada*/
                encabezado.innerHTML = `<h3>${datos.catName}</h3>
                                        <p>Verás aquí todos los productos de la categoría ${datos.catName}</p>` 
                contenido.innerHTML += `
                        <div onclick="setProductID(${datos.products[i].id})" class="col-md-4">
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


            function paraFiltrar(){
                let rangoMin = parseInt(document.getElementById('rangeFilterCountMin').value);
                let rangoMax = parseInt(document.getElementById('rangeFilterCountMax').value);
                let arregloFiltrado = []
                for (let x = 0; x < datos.products.length; x++) {
                    arregloFiltrado = datos.products.filter((costo, x) => datos.products[x].cost >= rangoMin && datos.products[x].cost <= rangoMax);
                    
                }
                
                //muestra los productos ordenados
                arregloFiltrado.sort((min, max)=> min.cost-max.cost);
                albumFiltrado(arregloFiltrado)
            }

            /*Funciones para ordenar por precio descendente, ascendente y relevancia*/

            function precioDescendente(){
                let precios = [];

                for (let i = 0; i < datos.products.length; i++) {
                    precios.push(datos.products[i])
                };

                precios.sort((min, max)=> max.cost - min.cost);
                albumFiltrado(precios);
            };

            function precioAscendente(){
                let precios = [];

                for (let y = 0; y < datos.products.length; y++) {
                    precios.push(datos.products[y])
                };

                precios.sort((min, max)=> min.cost - max.cost);
                albumFiltrado(precios);
            };

            function relevancia(){
                let cantVendidos = [];

                for (let z = 0; z < datos.products.length; z++) {
                    cantVendidos.push(datos.products[z])
                };
                cantVendidos.sort((min, max)=> max.soldCount - min.soldCount);
                albumFiltrado(cantVendidos);
            };

            //Función para mostrar en pantalla la lista de productos que cumplen con el filtro establecido
            function albumFiltrado(arreglo) {
                let album = [];
                for (let producto of arreglo){
                    album += `
                    <div class="col-md-4">
                        <div onclick="setProductID(${producto.id})" class="card mb-4 shadow p-3 mb-3 bg-body rounded border-0 zoom">
                            <img class="card-img-top rounded-2" src="${producto.image}" alt="fotoauto" style="height: 100%; width: 100%; display: block;">
                            <div class="card-body">
                                <div class="d-flex flex-row justify-content-between">
                                    <p class="card-text fw-bolder">${producto.name} - ${producto.currency} ${producto.cost}</p>
                                    <small class="text-muted">${producto.soldCount} vendidos</small>
                                </div>
                                <p class="card-text">${producto.description}</p>
                            </div>        
                        </div>
                    </div>`
                }
                contenido.innerHTML = album;
            };

            btnFiltro.addEventListener('click', ()=>{
                paraFiltrar();
            })
            btnLimpiar.addEventListener('click', ()=>{
                location.reload();
            });
            
            btnDescendente.addEventListener('click', ()=>{
                precioDescendente();
            });

            btnAscendente.addEventListener('click', ()=>{
                precioAscendente();
            });

            btnRelevancia.addEventListener('click', ()=>{
                relevancia();
            });
        })
});



