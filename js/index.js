
    //Borra el sessionStorage y redirecciona al login
let cerrarSesion = ()=> {
        sessionStorage.clear();
        window.location = 'login.html'
};

document.addEventListener("DOMContentLoaded", function(){
    //guardo en una variable el campo usuario que tomo del "sesionStorage"
    let usuarioLoggeado = sessionStorage.getItem('usuario');
    //pregunto si hay un usuario loggeado, en caso de que no, redirijo
    if (usuarioLoggeado == null) {
        location.href = 'login.html'
    } else {
        document.getElementById('username').innerHTML = usuarioLoggeado;
    };

    //botón para cerrar sesión
    document.getElementById('cerrarSesion').addEventListener("click", ()=>{
        cerrarSesion();
    });

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});