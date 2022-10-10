//------------------------------- CARRITO DE EJEMPLO -------------------------------
let cantCarrito =0;
let costoUnidad =0;

function showActualCart(){
    let defaultCart="";
    for(let i=0; i< actualCart.articles.length; i++){

        costoUnidad = actualCart.articles[i].unitCost;
        cantCarrito = actualCart.articles[i].count;

        defaultCart +=`<tr>
        <td style="width:20%"><img src="${actualCart.articles[i].image}" width="80" ></td>
        <td style="width:20%">${actualCart.articles[i].name}</td>
        <td style="width:20%">${actualCart.articles[i].currency} ${actualCart.articles[i].unitCost}</td>
        <td style="width:20%"><input type="text" class="form-control w-25" value="${cantCarrito}" onchange="cambiarCant()" id="cantAct"></td>
        <td style="width:20%"><strong>${actualCart.articles[i].currency} <span id="subTotal">${calcularSubTotal()}</span></strong></td>
        </tr>
        `;
    }
    document.getElementById("cartTable").innerHTML += defaultCart;
}

function calcularSubTotal(){

    return costoUnidad * cantCarrito;;
}
function cambiarCant(){

    let nuevoSubTot =document.getElementById("cantAct").value * costoUnidad;
    document.getElementById("subTotal").innerHTML = nuevoSubTot;
}


//------------------------------- CARRITO CON OBJETOS -------------------------------

function newSold(){
    let newCart= "";

    compraNuevaString = localStorage.getItem("compraNueva");
    compraNueva = JSON.parse(compraNuevaString);

    console.log(compraNueva);
    
    newCart +=`<tr>
    <td style="width:20%"><img src="${compraNueva.miniatura}" width="80" ></td>
    <td style="width:20%">${compraNueva.nombreP}</td>
    <td style="width:20%">${compraNueva.monedaP} ${compraNueva.costoP}</td>
    <td style="width:20%"><input type="text" class="form-control w-25" value="${compraNueva.cantP}" onchange="cambiarCant()" id="cantAct"></td>
    <td style="width:20%"><strong>${compraNueva.monedaP} <span id="subTotal">${calcularSubTotal()}</span></strong></td>
    </tr>
    `;

    document.getElementById("cartTable").innerHTML += newCart;
}




document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            showActualCart(actualCart);
            newSold();
            //console.log(actualCart);

        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });


});