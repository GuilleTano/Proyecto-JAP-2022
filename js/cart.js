
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


function newSold(){
    let newCart= "";

    compraNuevaString = localStorage.getItem("compraNueva");
    compraNueva = JSON.parse(compraNuevaString);
    console.log(compraNueva);

    Object.setPrototypeOf(compraNueva, Comprar.prototype);


    costoUnidad = compraNueva.costoP;
    cantCarrito = compraNueva.cantP;
    
    idCantidad = compraNueva.idP;
    idSubTotal = compraNueva.idP + "ST";

    newCart +=`<tr>
    <td style="width:20%"><img src="${compraNueva.miniatura}" width="80" ></td>
    <td style="width:20%">${compraNueva.nombreP}</td>
    <td style="width:20%">${compraNueva.monedaP} ${costoUnidad}</td>
    <td style="width:20%"><input type="text" class="form-control w-25" value="${cantCarrito}" onchange="cambiarCant()" id="${idCantidad}"></td>
    <td style="width:20%"><strong>${compraNueva.monedaP} <span id="${idSubTotal}">${compraNueva.subTotal()}</span></strong></td>
    </tr>
    `;

    document.getElementById("cartTable").innerHTML += newCart;

}




document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            //showActualCart();
            newSold();
            console.log(actualCart);

        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });


});