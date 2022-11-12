let correoDelUsuario = document.getElementById("email");
const formularios = document.querySelectorAll(".needs-validation");

//Borra el sessionStorage y redirecciona al login
let cerrarSesion = ()=> {
  sessionStorage.clear();
  window.location = 'login.html'
};

function hayUsuario() {
//guardo en una variable el campo usuario que tomo del "sesionStorage"
let usuarioLoggeado = sessionStorage.getItem("usuario");

//pregunto si hay un usuario loggeado, en caso de que no, redirijo
if (usuarioLoggeado == null) {
  location.href = "login.html";
} else {
  document.getElementById("username").innerHTML = usuarioLoggeado;
}
}


//Esta función trae el correo del usuario del sessionStorage y lo muestra en el campo "E-mail" de perfil del usuario
function mostrarCorreo() {
  let correo = sessionStorage.getItem("usuario");
  correoDelUsuario.value = correo;
}

//Si el formulario está correcto, los datos se guardan en el localStorage
function guardarDatos() {
  let datosUsuario = {};

  let primerNombre = document.getElementById("primerNombre").value;
  let segundoNombre = document.getElementById("segundoNombre").value;
  let primerApellido = document.getElementById("primerApellido").value;
  let segundoApellido = document.getElementById("segundoApellido").value;
  let email = document.getElementById("email").value;
  let tel = document.getElementById("tel").value;
  let avatar = document.getElementById("imgPerfil").src;

  datosUsuario.nombre = primerNombre;
  datosUsuario.segundoNombre = segundoNombre;
  datosUsuario.primerApellido = primerApellido;
  datosUsuario.segundoApellido = segundoApellido;
  datosUsuario.email = email;
  datosUsuario.tel = tel;
  datosUsuario.avatar = avatar;
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
}

//Si los datos del usuario están en el localStorage, se muestran en los campos del perfil
function mostrarDatosUsuario() {
  let datosUsuario = [];
  datosUsuario.push(JSON.parse(localStorage.getItem("datosUsuario")));

  for (let i = 0; i < datosUsuario.length; i++) {
    document.getElementById("primerNombre").value = datosUsuario[i].nombre;
    document.getElementById("segundoNombre").value =
      datosUsuario[i].segundoNombre;
    document.getElementById("primerApellido").value =
      datosUsuario[i].primerApellido;
    document.getElementById("segundoApellido").value =
      datosUsuario[i].segundoApellido;
    document.getElementById("tel").value = datosUsuario[i].tel;
    document.getElementById("imgPerfil").src = datosUsuario[i].avatar;
  }
}

//Funciones para mostrar alertas personalizadas
function alertaFormularioErroneo() {
  Swal.fire({
    title: "Debes completar el formulario",
    text: 'Presione "volver" para completarlo',
    icon: "error",
    confirmButtonText: "Volver",
  });
}

function alertaFormularioCorrecto() {
  Swal.fire({
    title: "Datos guardados correctamente",
    text: "Presione el botón para continuar",
    icon: "success",
    confirmButtonText: "Continuar",
  });
}


//función para capturar la imagen subida 
function mostrarImagen(){
  let avatar = document.querySelector('img');
  let archivo = document.querySelector('input[type=file]').files[0];
  let lector = new FileReader();

  lector.addEventListener('load', ()=> {
    avatar.src = lector.result;
  })

  if (archivo) {
    lector.readAsDataURL(archivo);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  siUsuarioNoEstaLoggeado();
  mostrarCorreo();
  document.getElementById('imgSubida').addEventListener('change', ()=>{
    mostrarImagen();
  })
  if (localStorage.getItem("datosUsuario") !== null) {
    mostrarDatosUsuario();
  }

  Array.prototype.slice.call(formularios).forEach(function (formularios) {
    formularios.addEventListener(
      "submit",
      function (event) {
        if (!formularios.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          alertaFormularioErroneo();
        } else {
          alertaFormularioCorrecto();
          guardarDatos();
          event.preventDefault();
        }

        formularios.classList.add("was-validated");
      },
      false
    );
  });

  hayUsuario()

  //botón para ir al perfil
  document.getElementById('miPerfil').addEventListener("click", ()=>{
      window.location = "my-profile.html"
  });
  
  //botón para ir al carrito
  document.getElementById('miCarrito').addEventListener("click", ()=>{
      window.location = 'cart.html'
  });
  
  //botón para ir al perfil
  document.getElementById('miPerfil').addEventListener("click", ()=>{
      window.location = "my-profile.html"
  });

  //botón para cerrar sesión
  document.getElementById('cerrarSesion').addEventListener("click", ()=>{
      cerrarSesion();
  });

});
