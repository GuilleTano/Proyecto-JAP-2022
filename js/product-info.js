
function showProdInfo() {

    let productoActual = `
        <div>
            <div>
                <h2>${infoProducto.name}</h2>
                <hr>
                <div>
                    <p><strong>Precio</strong> <br>
                    ${infoProducto.currency} ${infoProducto.cost}</p>
                    <p><strong>Descripción</strong> <br>
                    ${infoProducto.description}</p>
                    <p><strong>Categoria</strong> <br>
                    ${infoProducto.category}</p>
                    <p><strong>Cantidad de vendidos</strong> <br>
                    ${infoProducto.soldCount}</p>   
                    <p><strong>Imágenes ilustrativas</strong></p>
                </div>
            </div>  
        </div>
        `;
    document.getElementById("product_info").innerHTML = productoActual;

    for (let i=0; i<(infoProducto.images).length; i++ ){
    
        let row=`
        <img src="${infoProducto.images[i]}" class="img-thumbnail">
        `

        document.getElementById("product_info").innerHTML += row;
    }

}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            infoProducto = resultado.data;
            showProdInfo();
        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });
});