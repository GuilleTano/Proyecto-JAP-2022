function loginRedirection() {
    window.location.href = "portada.html";
}

//FUNCION PARA SETEAR EN LOCALSTORAGE EL CARRITO DE EJEMPLO
function exampleCart(){
    let exampleProduct = new Carrito(actualCart.articles[0].id, actualCart.articles[0].image, actualCart.articles[0].name, actualCart.articles[0].currency, actualCart.articles[0].unitCost);
    let cartList = [];
    cartList.push(exampleProduct);
    localStorage.setItem("cartList", JSON.stringify(cartList));

}

document.addEventListener("DOMContentLoaded", function(){

    localStorage.clear();

    //CARRITO EJEMPLO:
    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            //console.log(actualCart);
            exampleCart();

        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });

    //LOGIN:
    document.getElementById("loginBtn").addEventListener("click", function(){
        let faltaDato = false;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;

        if (pass === "") {
            faltaDato = true;
            let passAlert= `
            <div class="container">
                <div class="alert alert-danger alert-dismissible text-center" role="alert">
                    <div>Debe ingresar una clave</div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            `;
            document.getElementById("show-alerts").innerHTML += passAlert;
        }
        if (email === "") {
            faltaDato = true;
            let mailAlert= `
            <div class="container">
                <div class="alert alert-danger alert-dismissible text-center" role="alert">
                    <div>Debe ingresar un mail valido</div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            `;
            document.getElementById("show-alerts").innerHTML += mailAlert;
        }
        if(!faltaDato){
            //alert("Acceso correcto!");
            localStorage.setItem("mailUsuario", email);
            loginRedirection();
        }
    }
    );
});

