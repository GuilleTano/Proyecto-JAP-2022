let productsComents = [];

function showProdInfo() {

    let productoActual = `
            <div>
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
            `;
    document.getElementById("product_name").innerHTML += `<h2>${infoProducto.name}</h2>`;
    document.getElementById("product_info").innerHTML = productoActual;

    for (let i = 0; i < (infoProducto.images).length; i++) {

        let imagesArray = `
        <img src="${infoProducto.images[i]}" class="img-thumbnail"width="270" height="270">
        `;
        document.getElementById("product_info").innerHTML += imagesArray;
    }

    document.getElementById("related_products").innerHTML = showRelatedProducts();
}

//Cambiar estrellas
function showStarsScore(puntos) {
    let starScore = 0;
    switch (puntos) {
        case 1: starScore = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            break;
        case 2: starScore = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            break;
        case 3: starScore = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            break;
        case 4: starScore = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`;
            break;
        case 5: starScore = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`;
            break;
    }
    return starScore;
}

function showProdComents() {

    for (let i = 0; i < (comProducto).length; i++) {

        productsComents += `
        <ul class="list-group">
            <li class="list-group-item"><strong>${comProducto[i].user}</strong> - ${comProducto[i].dateTime} - ${showStarsScore(comProducto[i].score)}<br>
            ${comProducto[i].description}</li>
        </ul>`;
    }
    document.getElementById("product_coments").innerHTML = productsComents;
}

//Productos Relacionados
function showRelatedProducts() {
    let relProd="";
    for (let i = 0; i < (infoProducto.relatedProducts).length; i++) {
        relProd += `
        <img src="${infoProducto.relatedProducts[i].image}" class="img-thumbnail"width="270" height="270"><br>
        <p>${infoProducto.relatedProducts[i].name}</p>
        <p>${infoProducto.relatedProducts[i].id}</p>
        <hr>
        `;
    }
    return relProd;
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

    //LLAMA A LOS COMENTARIOS ANTIGUOS
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            comProducto = resultado.data;
            showProdComents();
        }
        else {
            alert("Hubo un problema al cargar la pagina");
        }
    });

    //AGREGAR NUEVO COMENTARIO
    document.getElementById("btnEnviarComent").addEventListener("click", function () {
        let faltaDato = false;
        let newData = document.getElementById("new_coment").value;
        let newScore = parseInt(document.getElementById("score").value);
        let today = new Date();
        let now= today.toLocaleString("sv-SE");

        if (newData === "") {
            faltaDato = true;
            alert("Debe escribir un comentario");
        }
        if (newScore >5 || newScore <1) {              
            faltaDato = true;
            alert("Debe elegir una puntuacion");
        }
        if(!faltaDato){
            let newComent = `<li class="list-group-item"><strong>${localStorage.getItem("mailUsuario")}</strong> - ${now} - ${showStarsScore(newScore)}<br>
            ${newData}</li>`;
            document.getElementById("product_coments").innerHTML += newComent;
        }
        document.getElementById("new_coment").value="";
        document.getElementById("score").value="0";
    });
});
