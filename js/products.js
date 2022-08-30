let productosUrl;

function showProducts() {

    console.log(typeof localStorage.getItem("catID"));

    for (let producto of listaProductos.products) {

        let row = "";

        row = `
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
});
