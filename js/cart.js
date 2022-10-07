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

        defaultCart +=`<tr>
        <td><img src="${actualCart.articles[i].image}" width="80" ></td>
        <td>${actualCart.articles[i].name}</td>
        <td>${actualCart.articles[i].unitCost}</td>
        <td><input type="text" class="form-control w-25" value="${actualCart.articles[i].count}"></td>
        <td> ${actualCart.articles[i].unitCost * actualCart.articles[i].count}</td>
        </tr>
        `;
    }
    document.getElementById("cartTable").innerHTML += defaultCart;
}

/* 
<div class="col-4">
    <label for="streetName">Calle</label>
    <input type="text" class="form-control" id="streetName" value="" name="streetName">
</div>
*/



document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_PRUEBAS).then(function (resultado) {
        if (resultado.status === "ok") {
            actualCart = resultado.data;
            showActualCart(actualCart);

            //console.log(actualCart);
            //console.log(typeof actualCart);
        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });


});