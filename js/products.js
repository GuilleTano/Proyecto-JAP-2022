let precioMin = undefined;
let precioMax =undefined;

function filtrarProductos(){

    //console.log(listaProductos); OBJETO
    console.log(listaProductos.products); //ARRAY

    let listaFiltrada = listaProductos.products.filter(producto => (parseInt(producto.cost) >= precioMin || precioMin==undefined) && (parseInt(producto.cost) <= precioMax || precioMax==undefined));

    console.log(listaFiltrada); //ARRAY
    return listaFiltrada;

}

function showProducts() {

    document.getElementById("productsList").innerHTML = "";


    for (let producto of listaProductos.products){

        let row = `
                <div class="list-group-item list-group-item-action cursor-active">
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

                </div>
            `;

            //console.log(row); //Se muestran siempre todos los objetos aunque aplique el filtro
        document.getElementById("productsList").innerHTML += row;
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

        showProducts(filtrarProductos());
        

    });

});
