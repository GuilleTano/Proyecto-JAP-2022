//let productosActuales = [];

function showProducts() {

    for (let producto of listaProductos.products){
        let row="";

        row= `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${producto.name}</h4>
                                <small class="text-muted">${producto.soldCount} artículos</small>
                            </div>          
                        </div>
                        <p class="mb-1">${producto.description}</p>
                    </div>

                </div>
            `;
    
        document.getElementById("productsList").innerHTML += row;
    }   

}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_101).then(function(resultado){
        if (resultado.status === "ok"){
            listaProductos = resultado.data;
            showProducts();
        }
        else{
            //avisar del error con una alerta por ejemplo
        }
    });
});


/*
    let htmlContentToAppend = "";
    for (let i = 0; i < prodActuales.products.length; i++) {
        let cosoProd = prodActuales.products[i];

        htmlContentToAppend += `
        <div onclick="setCatID(${cosoProd.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${cosoProd.image}" alt="${cosoProd.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${cosoProd.name}</h4>
                        <small class="text-muted">${cosoProd.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${cosoProd.description}</p>
                </div>
            </div>
        </div>    
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

    */