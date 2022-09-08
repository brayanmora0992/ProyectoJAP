let productID = localStorage.getItem('ProductID');
let productInfo = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
let commentInfo = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
let infoContainer = document.getElementById('infoContainer');
let commentlist = document.getElementById('commentList');

document.addEventListener('DOMContentLoaded', ()=>{
    fetch(productInfo)
    .then(response => response.json())
    .then(datos => {
        //preguntar como lo hago con un for loop
        //shadow p-5 mb-5 bg-body rounded border-0 para linea 14
            infoContainer.innerHTML = `
            <div class="d-flex flex-row justify-content-" id="cuerpoProducto"> 
            <div class="infoList">
              <div>
                <h3>${datos.name}</h3><br>
              </div>
              <div>
                <h5>Descripción</h5>
                <p>${datos.description}</p>
              </div>
              <div>
                <h5>Categoría</h5>
                <p>${datos.category}</p>
              </div>
              <div>
                <h5>Cantidad de vendidos</h5>
                <p>${datos.soldCount}</p>
              </div>
              <hr>
              <div>
                <h5>Precio: <span>${datos.currency} ${datos.cost}</span></h5>
              </div>
            </div>
            <div id="carouselControls" class="carousel carousel-dark slide w-100" data-bs-ride="carousel" >
              <div class="carousel-inner" id="imgContainer">
                <div class="carousel-item active">
                  <img src="${datos.images[0]}" alt="${datos.name[0]}">
              </div>
              <div class="carousel-item">
                  <img src="${datos.images[1]}" alt="${datos.name[1]}">
              </div>
              <div class="carousel-item">
                  <img src="${datos.images[2]}" alt="${datos.name[2]}">
              </div>  
              <div class="carousel-item">
                  <img src="${datos.images[3]}" alt="${datos.name[3]}">
              </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
            `
      });

      
      fetch(commentInfo)
      .then(response => response.json())
      .then(info =>{
        
        for (let x = 0; x < info.length; x++) {
          commentlist.innerHTML += `<li class="list-group-item"><b>${info[x].user}</b> - ${info[x].dateTime} - <span id="estrellas">${info[x].score}</span><br>
          <span>${info[x].description}</span></li>`

        }
        
      });
      
});

/*function estrellitas(cant) {
  for (let i = 1; i <= 5; i++) {
    if (i <= cant) {
      document.getElementById('estrellas').innerHTML += `<i class="fas fa-star checked"></i>`;
    } else {
      document.getElementById('estrellas').innerHTML += `<i class="fas fa-star unchecked"></i>`;
    }
  }
}
estrellitas(info[x].score)*/