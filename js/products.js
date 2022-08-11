document.addEventListener('DOMContentLoaded', ()=>{

    const autitos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    let listadoAutos = document.getElementById('contenido');

    fetch(autitos)
        .then(response => response.json())
        .then(datos => {
            for (let i = 0; i < datos.products.length; i++) {
                listadoAutos.innerHTML += `
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
                        </div>
                    </div>
                </div>
            </div>`
                
            }
        })
});