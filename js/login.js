
//Si el correo y la contraseña no están vacíos, guarda el email en sessionStorage y redirecciona al index.html
 
function redireccion(){
        let correo = document.getElementById('correo').value;
        let contraseña = document.getElementById('clave').value;

        if (correo.length == 0 || contraseña.length == 0) {
                alert('Debes completar los campos antes de continuar')            
        } else {
              sessionStorage.setItem('usuario', correo);
              location.href='index.html';
        }
}


//Se le agrega un event listener al botón de ID "ingreso" y cuando se cliquea se llama a la función redireccion()

document.addEventListener('DOMContentLoaded', ()=>{

        const ingreso = document.getElementById('ingreso');
        
        ingreso.addEventListener('click', ()=>{
                redireccion();
        });
});