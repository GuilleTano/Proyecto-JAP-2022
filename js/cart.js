itemCarritoString = localStorage.getItem("itemCarrito");
itemCarrito = JSON.parse(itemCarritoString);
Object.setPrototypeOf(itemCarrito, Carrito.prototype);

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

    let nuevoSubTot =document.getElementById(idCantidad).value * costoUnidad;
    document.getElementById(idSubTotal).innerHTML = nuevoSubTot;
}


//------------------------------- CARRITO CON BOTON COMPRAR -------------------------------
function showCart(){

    idCantidad = itemCarrito.idP;
    idSubTotal = itemCarrito.idP + "ST";
    
    let newItemCart =`<tr>
    <td style="width:20%"><img src="${itemCarrito.miniatura}" width="80" ></td>
    <td style="width:20%">${itemCarrito.nombreP}</td>
    <td style="width:20%">${itemCarrito.monedaP} ${itemCarrito.costoP}</td>
    <td style="width:20%"><input type="text" class="form-control w-25" value="${itemCarrito.cantP}" onchange="changeCant()" id="${idCantidad}"></td>
    <td style="width:20%"><strong>${itemCarrito.monedaP} <span id="${idSubTotal}">${itemCarrito.subTotal()}</span></strong></td>
    </tr>
    `;

    document.getElementById("cartTable").innerHTML += newItemCart;
}

function changeCant(){

    itemCarrito.newCant = document.getElementById(idCantidad).value;
    let nuevoSubTot = itemCarrito.subTotal();

    document.getElementById(idSubTotal).innerHTML = nuevoSubTot;
}


document.addEventListener("DOMContentLoaded", function(){

    //Seprar el llamado del carrito con boton del carrito de ejemplo


    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            //showActualCart();
            showCart();
            console.log(actualCart);

        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });


});