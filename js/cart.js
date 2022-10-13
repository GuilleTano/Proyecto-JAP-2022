let cantCarrito =0;
let costoUnidad =0;


//------------------------------- CARRITO DE EJEMPLO -------------------------------
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

/*
function showActualCart(){
    let defaultCart="";
    for(let i=0; i< actualCart.articles.length; i++){

        costoUnidad = actualCart.articles[i].unitCost;
        cantCarrito = actualCart.articles[i].count;

        idCantidad = actualCart.articles[i].id;

        defaultCart =`<tr>
        <td style="width:20%"><img src="${actualCart.articles[i].image}" width="80" ></td>
        <td style="width:20%">${actualCart.articles[i].name}</td>
        <td style="width:20%">${actualCart.articles[i].currency} ${costoUnidad}</td>
        <td style="width:20%"><input type="text" class="form-control w-25" value="${cantCarrito}" onchange="cambiarCant()" id="${idCantidad}"></td>
        <td style="width:20%"><strong>${actualCart.articles[i].currency} <span id="subTotal">${calcularSubTotal()}</span></strong></td>
        </tr>
        `;
    }
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
function showCart(){

    let itemCartList = "";

    cartList = JSON.parse(localStorage.getItem("cartList"));
    console.log(cartList);

    for (let i = 0; i < (cartList).length; i++) {

        Object.setPrototypeOf(cartList[i], Carrito.prototype);

        esteObjeto = cartList[i];
        idCantidad = "CT" + cartList[i].idP;
        idSubTotal = cartList[i].idP + "ST";
        
        itemCartList +=`<tr>
        <td style="width:20%"><img src="${cartList[i].miniatura}" width="80" ></td>
        <td style="width:20%">${cartList[i].nombreP}</td>
        <td style="width:20%">${cartList[i].monedaP} ${cartList[i].costoP}</td>
        <td style="width:20%"><input type="text" class="form-control w-25" value="${cartList[i].cantP}" oninput="cambiarCantidad(${cartList[i].idP}, this.value)"></td>
        <td style="width:20%"><strong>${cartList[i].monedaP} <span id="${idSubTotal}">${cartList[i].subTotal()}</span></strong></td>
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


    //TODO ESTA MAL

    //ver de usar el input en lugar de onchange?

    //usar this.value para pasar por parametro a la funcion del onchange
    //Tengo que modificar el array y luego mostrarlo nuevamente en pantalla


    /*
    esteObjeto.newCant = document.getElementById(idCantidad).value;
    let nuevoSubTot = esteObjeto.subTotal();
    document.getElementById(idSubTotal).innerHTML = nuevoSubTot;
    */
}

function borrarProducto(){

    //esta funcion debe modificar la lista
    //llamamos la funcion desde el onclick y le pasamos por parametro el ID del producto
    //podemos usar el ID para identificar el elemento a borrar

    //luego debe volver a mostrar la lista - con showCart() por ejemplo
}


document.addEventListener("DOMContentLoaded", function(){

    //Separar el llamado del carrito con boton del carrito de ejemplo


    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            //showActualCart();
            showCart();
            //console.log(actualCart);

        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });


});