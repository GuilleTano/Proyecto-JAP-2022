
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
        <img src="${infoProducto.images[i]}" class="img-thumbnail"width="270" height="270">
        `

        document.getElementById("product_info").innerHTML += row;
    }

}

function showProdComents(){
    let productsComents =[];
    for(let i=0; i<(comProducto).length; i++){
        
        //Switch para mostrar el score en estrellas
        let starScore= 0;
        switch(comProducto[i].score){
            case 1: starScore =`<span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            break;
            case 2: starScore =`<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            break;
            case 3: starScore =`<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            break;
            case 4: starScore =`<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`;
            break;
            case 5: starScore =`<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`;
            break;
        } 
        
        productsComents +=`
        <ul class="list-group">
            <li class="list-group-item"><strong>${comProducto[i].user}</strong> - ${comProducto[i].dateTime} - ${starScore}<br>
            ${comProducto[i].description}</li>
        </ul>`;
    }
    document.getElementById("product_coments").innerHTML = productsComents;
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
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            comProducto = resultado.data;
            showProdComents();
        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });
});