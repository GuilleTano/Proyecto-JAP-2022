const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("prodID") + ".json";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("prodID") + ".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";

//URL para el carrito de pruebas
const CART_PRUEBAS = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

function verificarLogin(){
  if(!localStorage.getItem("mailUsuario")){
    window.location = "index.html";
  }
}

// **** MOSTRAR USUARIO LOGUEADO Y MENU DE OPCIONES ****
document.addEventListener("DOMContentLoaded", function(){
  let userMenu ="";
  if(localStorage.getItem("mailUsuario")){

    userMenu =`
    <div class="dropdown">
    <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${localStorage.getItem("mailUsuario")}
    </button>
    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="index.html">Cerrar sesión</a></li>
    </ul>
    </div>
    `;
  }
  else{
    userMenu = `
    <button class="btn btn-dark" type="button" onclick="window.location ='index.html'">Ingresar
    </button>
    `;
  }
  document.getElementById("navbarNav").innerHTML += userMenu;
});

// **** CLASE PARA CREAR LOS ITEMS DEL CARRITO ****
class Carrito{
  constructor(idP, miniatura, nombreP, monedaP, costoP){
      this.idP = idP;
      this.miniatura = miniatura;
      this.nombreP = nombreP;
      this.monedaP = monedaP;
      this.costoP = costoP;
      this.cantP = 1;
  }
  subTotal(){
      return this.cantP * this.costoP;
  }
  set newCant(nuevoCantP){
      this.cantP = nuevoCantP;
      return this.cantP;
  }
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
