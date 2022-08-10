function redireccion(){
        let correo = document.getElementById('correo').value;
        let contraseña = document.getElementById('clave').value;
        let correo2 = document.getElementById('correo')

        if (correo.length == 0 || contraseña.length == 0) {
                alert('Debes completar los campos antes de continuar')            
        } else {
              sessionStorage.setItem('usuario', correo);
              location.href='index.html';
        }
}

document.addEventListener('DOMContentLoaded', ()=>{

        const ingreso = document.getElementById('ingreso');
        
        ingreso.addEventListener('click', ()=>{
                redireccion();
        });
});