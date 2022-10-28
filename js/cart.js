function backToCategories(){
    window.location = "categories.html";
}

function emptyCart(){
    document.getElementById("voidCart").innerHTML = `
    <div class="alert alert-info mt-5 role="alert" style="text-align:center">Su carrito esta vacio</div>`;
}

function showCart() {
    
    let itemCartList = "";
    cartList = JSON.parse(localStorage.getItem("cartList"));
    //console.log(cartList);

    for (let i = 0; i < (cartList).length; i++) {

        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        itemCartList += `<tr>
            <td style="width:20%"><img src="${cartList[i].miniatura}" width="80" ></td>
            <td style="width:20%">${cartList[i].nombreP}</td>
            <td style="width:20%">${cartList[i].monedaP} ${cartList[i].costoP}</td>
            <td style="width:20%"><input type="text" class="form-control w-25" value="${cartList[i].cantP}" oninput="changeCount(${cartList[i].idP}, this.value)"></td>
            <td style="width:20%"><strong>${cartList[i].monedaP} ${cartList[i].subTotal()}</strong></td>
            <td style="width:20%"><button type="button" class="btn btn-danger" id="boton_eliminar" onclick="deleteProduct(${cartList[i].idP})">Eliminar</button></td>
            </tr>
        `;
    }
    document.getElementById("cartTable").innerHTML = itemCartList;
}

function changeCount(productoID, nuevoValor){

    cartList = JSON.parse(localStorage.getItem("cartList"));

    if(nuevoValor < 1){
        //preguntar si quiere borrar el articulo | hacer esto con un modal?
        //hacer botones de + y - | bloquear para que el numero minimo sea 1
        
        alert("La cantidad del articulo no puede ser 0");
    }
    else{
        for (let i = 0; i < (cartList).length; i++){
            Object.setPrototypeOf(cartList[i], Carrito.prototype);
    
            if(cartList[i].idP === productoID){
                cartList[i].newCant = nuevoValor;
            }
        }
        localStorage.setItem("cartList", JSON.stringify(cartList));
        showCart();
        calcularCostos();
    }

    /*
    for (let i = 0; i < (cartList).length; i++){
        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        if(cartList[i].idP === productoID){
            cartList[i].newCant = nuevoValor;
        }
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    showCart();
    calcularCostos();
    */
}

function deleteProduct(productoID){

    cartList = JSON.parse(localStorage.getItem("cartList"));

    for (let i = 0; i < (cartList).length; i++){
        Object.setPrototypeOf(cartList[i], Carrito.prototype);
        if(cartList[i].idP === productoID){
            cartList.splice((cartList).indexOf(cartList[i]), 1);
        }
    }
    if(cartList.length < 1){
        localStorage.removeItem("cartList");
        emptyCart();
    }
    else{
        localStorage.setItem("cartList", JSON.stringify(cartList));
        showCart();
        calcularCostos();
    }
}

//************** COSTOS  **************

function tiposEnvio(){

    let tipoEnvio = 3;

    if(document.getElementById("standardOp").checked){
        tipoEnvio = 1;
    }
    if(document.getElementById("expressOp").checked){
        tipoEnvio = 2;
    }
    if(document.getElementById("premiumOp").checked){
        tipoEnvio = 3;
    }

    return tipoEnvio;
}

function costoEnvio(tipoEnvio, subTotalcarrito){
    let costoEnvio=0;

    switch (tipoEnvio) {
        case 1:
            costoEnvio = subTotalcarrito * (5/100);
            break;
    
        case 2:
            costoEnvio = subTotalcarrito * (7/100);
            break;

         case 3:
            costoEnvio = subTotalcarrito * (15/100);
            break;
    }
    return costoEnvio;
}

function subtotalCarrito(){

    cartList = JSON.parse(localStorage.getItem("cartList"));

    let subTotalCart = 0;
    let costoDolares = 0;

    for(let i =0; i< (cartList).length; i++){
        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        if(cartList[i].monedaP == "UYU"){
            costoDolares = cartList[i].subTotal() / 40;
        }
        else{
            costoDolares = cartList[i].subTotal();
        }
        subTotalCart = subTotalCart + costoDolares;
    }
    
    return subTotalCart;
}

function calcularCostos(){
    let calcuSubtotal = subtotalCarrito();
    let calcuEnvio = costoEnvio(tiposEnvio(), subtotalCarrito());
    let calcutotal = calcuSubtotal + calcuEnvio;

    let listaCostos ={
        subtotal: calcuSubtotal.toFixed(2), 
        envio: calcuEnvio.toFixed(2), 
        total: calcutotal.toFixed(2)
    };
    localStorage.setItem("listaCostos", JSON.stringify(listaCostos));
    mostrarCostos();
}

function mostrarCostos(){

    listaCostos = JSON.parse(localStorage.getItem("listaCostos"));

    let mostrarCost =`
    <div class="list-group-item">
        <div class="row">
            <div class="col-9">
                <h5 class="mb-1">Subtotal</h5>
                <p>Costo unitario del producto por cantidad</p>
            </div>
            <div class="col-3">USD ${listaCostos.subtotal}</div>
        </div>
    </div>

    <div class="list-group-item">
        <div class="row">
            <div class="col-9">
                <h5 class="mb-1">Costo de envío</h5>
                <p>Segun el tipo de envío</p>
            </div>
            <div class="col-3">USD ${listaCostos.envio}</div>
        </div>
    </div>

    <div class="list-group-item">
        <div class="row">
            <div class="col-9">
                <h5 class="mb-1">Total</h5>
            </div>
            <div class="col-3"><strong>USD ${listaCostos.total}</strong></div>
        </div>
    </div>
    `;
    document.getElementById("listaCostos").innerHTML = mostrarCost;

}

//************ VALIDACIONES PARA EL FORM ************

//Modal metodos de pago

//Funcion que activa o desactiva los input segun el metodo elegido
function payMethod(){
    let transfer = document.getElementById("transfer");
    let countNumber = document.getElementById("countNumber");
    let cardOption = document.getElementById("cardOption");
    let cardNumber = document.getElementById("cardNumber");
    let CVV = document.getElementById("CVV");
    let validDate = document.getElementById("validDate");

    if(cardOption.checked){

        countNumber.setAttribute("disabled", "");

        cardNumber.removeAttribute("disabled");
        CVV.removeAttribute("disabled");
        validDate.removeAttribute("disabled");
    }
    else if(transfer.checked){
        countNumber.removeAttribute("disabled");
        cardNumber.setAttribute("disabled", "");
        CVV.setAttribute("disabled", "");
        validDate.setAttribute("disabled", "");
    }
}

//Funcion para validar los datos del metodo de pago

function modalValid(){

    let validacion = false;
    let transfer = document.getElementById("transfer");
    let countNumber = document.getElementById("countNumber");

    if(transfer.checked && countNumber.value === ""){
        countNumber.classList.add("is-invalid");

        countNumber.addEventListener("keyup", function(){

            if(countNumber.value === ""){
                countNumber.classList.remove("is-valid");
                countNumber.classList.add("is-invalid");

            }
            else{
                countNumber.classList.remove("is-invalid");
                countNumber.classList.add("is-valid");
            }
        });
    }
    else{
        validacion = true;
    }

    return validacion;
}




//Codigo de bootstrap
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        modalValid();
        if (!form.checkValidity() || !modalValid()) {
          event.preventDefault();
          event.stopPropagation();

        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


document.addEventListener("DOMContentLoaded", function(){

    if(localStorage.getItem("cartList")){
        showCart();
        calcularCostos();
        mostrarCostos();
    }
    else{
        emptyCart();
    }
});
