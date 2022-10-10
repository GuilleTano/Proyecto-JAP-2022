let cantCarrito =0;
let costoUnidad =0;

class Carrito{

    constructor(image, name, currency, cost, count, subt){
        this.image= image;
        this.name= name;
        this.currency = currency;
        this.cost= cost;
        this.count= count;
        this.subt= subt;
    }

}

let cart1= new Carrito("OSO TEDDY", "Oso de peluche", 2400, 1, 2400);
//console.log(cart1);

function showActualCart(){
    let defaultCart="";
    for(let i=0; i< actualCart.articles.length; i++){

        cantCarrito = actualCart.articles[i].count;
        costoUnidad = actualCart.articles[i].unitCost;

        defaultCart +=`<tr>
        <td style="width:20%"><img src="${actualCart.articles[i].image}" width="80" ></td>
        <td style="width:20%">${actualCart.articles[i].name}</td>
        <td style="width:20%">${actualCart.articles[i].currency} ${actualCart.articles[i].unitCost}</td>
        <td style="width:20%"><input type="text" class="form-control w-25" value="${cantCarrito}"></td>
        <td style="width:20%"><strong>${actualCart.articles[i].currency} ${calcularSubTotal(costoUnidad, cantCarrito)}</strong></td>
        </tr>
        `;
    }
    document.getElementById("cartTable").innerHTML += defaultCart;
}

function calcularSubTotal(){

    return costoUnidad * cantCarrito;
}
function cambiarCantidad(){
    return 
}

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            showActualCart(actualCart);

            console.log(actualCart);
            //console.log(typeof actualCart);
        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });


    document.getElementById("cantidad").addEventListener("input", function(){

        cantCarrito = document.getElementById("cantidad").value;
        showActualCart();

    });
    

});