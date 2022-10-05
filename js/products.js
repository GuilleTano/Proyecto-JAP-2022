let precioMin = undefined;
let precioMax =undefined;
let buscador = "";

//Funcion para guardar el ID del prducto elegido y redirigir a product-info
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProducts() {

    document.getElementById("productsList").innerHTML = "";

    for (let producto of listaProductos.products){

        if ((parseInt(producto.cost) >= precioMin || precioMin==undefined) && (parseInt(producto.cost) <= precioMax || precioMax==undefined)){

            if(producto.name.toLowerCase().includes(buscador.toLowerCase())){

                let productsList = `
                <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                                <small class="text-muted">${producto.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${producto.description}</p>       
                        </div>
                    </div>
    
                </div>`;

                document.getElementById("productsList").innerHTML += productsList;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            listaProductos = resultado.data;
            showProducts();
        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });

    // ------------ FILTRO --------------
    document.getElementById("boton_filtrar").addEventListener("click", function(){

        if (document.getElementById("precio-min").value !=""){
            precioMin= parseInt(document.getElementById("precio-min").value);
        }
        else{
            precioMin = undefined;
        }

        if (document.getElementById("precio-max").value !=""){
            precioMax= parseInt(document.getElementById("precio-max").value);
        }
        else{
            precioMax = undefined;
        }

        showProducts();
    });

    // ------------ LIMPIAR --------------
    document.getElementById("boton_limpiar").addEventListener("click", function(){
        precioMin = undefined;
        precioMax = undefined;

        document.getElementById("precio-max").value ="";
        document.getElementById("precio-min").value ="";

        showProducts();
    });

    // ------------ ORDEN DESC RELEVANCIA --------------
    document.getElementById("relevancia").addEventListener("click", function(){

        listaProductos.products.sort(function(a, b){
            return parseInt(b.soldCount) - parseInt(a.soldCount);
        });

        showProducts();
    });

    // ------------ ORDEN DESC PRECIO --------------
    document.getElementById("mas_caro").addEventListener("click", function(){

        listaProductos.products.sort(function(a, b){
            return parseInt(b.cost) - parseInt(a.cost);
        });

        showProducts();
    });

    // ------------ ORDEN ASC PRECIO --------------
    document.getElementById("mas_barato").addEventListener("click", function(){

        listaProductos.products.sort(function(a, b){
            return parseInt(a.cost) - parseInt(b.cost);
        });
    
        showProducts();
    });

    // -------------- DESAFIO: BUSCADOR --------------
    document.getElementById("buscador").addEventListener("input", function(){

        buscador = document.getElementById("buscador").value;
        showProducts();

    });

});
