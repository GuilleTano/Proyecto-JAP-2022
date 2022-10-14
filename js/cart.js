//------------------------------- CARRITO DE EJEMPLO -------------------------------
let cantCarrito =0;
let costoUnidad =0;

/*
function showActualCart(){
    let defaultCart= "";

    costoUnidad = actualCart.articles[0].unitCost;
    cantCarrito = actualCart.articles[0].count;
    
    idCantidad = actualCart.articles[0].id;
    idSubTotal = actualCart.articles[0].id + "ST";

    defaultCart =`<tr>
    <td style="width:20%"><img src="${actualCart.articles[0].image}" width="80" ></td>
    <td style="width:20%">${actualCart.articles[0].name}</td>
    <td style="width:20%">${actualCart.articles[0].currency} ${costoUnidad}</td>
    <td style="width:20%"><input type="text" class="form-control w-25" value="${cantCarrito}" onchange="cambiarCant()" id="${idCantidad}"></td>
    <td style="width:20%"><strong>${actualCart.articles[0].currency} <span id="${idSubTotal}">${calcularSubTotal()}</span></strong></td>
    </tr>
    `;

    document.getElementById("cartTable").innerHTML += defaultCart;
}
*/

function calcularSubTotal(){

    return costoUnidad * cantCarrito;;
}
function cambiarCant(){

    let nuevoSubTot = document.getElementById(idCantidad).value * costoUnidad;
    document.getElementById(idSubTotal).innerHTML = nuevoSubTot;
}

//------------------------------- CARRITO CON BOTON COMPRAR -------------------------------
function emptyCart(){
    document.getElementById("voidCart").innerHTML = `
    <div class="alert alert-info" role="alert" style="text-align:center">Su carrito esta vacio</div>`;
}

function showCart() {

    let itemCartList = "";

    cartList = JSON.parse(localStorage.getItem("cartList"));
    console.log(cartList);

    if(cartList.length < 1){
        emptyCart();
    }

    for (let i = 0; i < (cartList).length; i++) {

        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        itemCartList += `<tr>
            <td style="width:20%"><img src="${cartList[i].miniatura}" width="80" ></td>
            <td style="width:20%">${cartList[i].nombreP}</td>
            <td style="width:20%">${cartList[i].monedaP} ${cartList[i].costoP}</td>
            <td style="width:20%"><input type="text" class="form-control w-25" value="${cartList[i].cantP}" oninput="cambiarCantidad(${cartList[i].idP}, this.value)"></td>
            <td style="width:20%"><strong>${cartList[i].monedaP} ${cartList[i].subTotal()}</strong></td>
            <td style="width:20%"><button type="button" class="btn btn-danger" id="boton_eliminar" onclick="borrarProducto(${cartList[i].idP})">Eliminar</button></td>
            </tr>
        `;
    }
    document.getElementById("cartTable").innerHTML = itemCartList;
}

function cambiarCantidad(productoID, nuevoValor){

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

function borrarProducto(productoID){

    cartList = JSON.parse(localStorage.getItem("cartList"));

    for (let i = 0; i < (cartList).length; i++){
        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        if(cartList[i].idP === productoID){
            
            cartList.splice((cartList).indexOf(cartList[i]), 1);
        }
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    showCart();
}


document.addEventListener("DOMContentLoaded", function(){

    if(localStorage.getItem("cartList")){
        showCart();
    }
    else{
        emptyCart();
    }

    //LLAMADA AL CARRITO DEL SERVIDOR
    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            //showActualCart();
            //console.log(actualCart);

        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });
});