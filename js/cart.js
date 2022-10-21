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
    console.log(cartList);

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

    
    //APLICAR A TODO ESTO LOCAL STORAGE

    let listaCostos =`
    <div class="list-group-item">
        <div class="row">
            <div class="col-9">
                <h5 class="mb-1">Subtotal</h5>
                <p>Costo unitario del producto por cantidad</p>
            </div>
            <div class="col-3">${cartSubtotal()}</div>
        </div>
    </div>

    <div class="list-group-item">
        <div class="row">
            <div class="col-9">
                <h5 class="mb-1">Costo de envío</h5>
                <p>Segun el tipo de envío</p>
            </div>
            <div class="col-3">${calcularCostoEnvio(tipoEnvio())}</div>
        </div>
    </div>

    <div class="list-group-item">
        <div class="row">
            <div class="col-9">
                <h5 class="mb-1">Total</h5>
            </div>
            <div class="col-3"><strong>9999</strong></div>
        </div>
    </div>
    `;
    document.getElementById("listaCostos").innerHTML = listaCostos;
}

function changeCount(productoID, nuevoValor){

    cartList = JSON.parse(localStorage.getItem("cartList"));

    for (let i = 0; i < (cartList).length; i++){
        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        if(cartList[i].idP === productoID){
            cartList[i].newCant = nuevoValor;
        }
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    showCart();
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
    }
}


function cartSubtotal(){
    let subTotalCart = 0;
    for(let i =0; i< (cartList).length; i++){

        subTotalCart = subTotalCart + cartList[i].subTotal();
    }
    return subTotalCart;
}

function tipoEnvio(){

    let tipoEnvio="";

    if(document.getElementById("standardOp")){
        tipoEnvio = 1;
    }
    if(document.getElementById("expressOp")){
        tipoEnvio = 2;
    }
    if(document.getElementById("premiumOp")){
        tipoEnvio = 3;
    }
    
    return tipoEnvio;
}


function calcularCostoEnvio(tipoEnvio){

    let costoEnvio=0;
    let subTotal = 0;

    for(let i =0; i< (cartList).length; i++){

        if(cartList[i].monedaP == "UYU"){
            subTotal = cartList[i].subTotal() / 40;
        }
        else{
            subTotal = cartList[i].subTotal();
        }
    }

    switch (tipoEnvio) {
        case 1:
            costoEnvio = subTotal * (5/100);
            break;
    
        case 2:
            costoEnvio = subTotal * (7/100);
            break;

         case 3:
            costoEnvio = subTotal * (15/100);
            break;
    }

    return costoEnvio;
}




document.addEventListener("DOMContentLoaded", function(){

    if(localStorage.getItem("cartList")){
        showCart();
    }
    else{
        emptyCart();
    }
});
