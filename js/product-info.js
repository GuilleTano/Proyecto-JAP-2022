let productsComents = [];

function showProdInfo() {

    let productoActual = `
            <p><strong>Precio</strong> <br>
            ${infoProducto.currency} ${infoProducto.cost}</p>
            <p><strong>Descripción</strong> <br>
            ${infoProducto.description}</p>
            <p><strong>Categoria</strong> <br>
            ${infoProducto.category}</p>
            <p><strong>Cantidad de vendidos</strong> <br>
            ${infoProducto.soldCount}</p>   
            <p><strong>Imágenes ilustrativas</strong></p>
            `;
    document.getElementById("product_name").innerHTML += `<h2>${infoProducto.name}</h2>`;
    document.getElementById("product_info").innerHTML = productoActual;

    let imagesPrd="";
    for (let i = 0; i < (infoProducto.images).length; i++) {
        if(i == 0){
            imagesPrd +=`
            <div class="carousel-item active">
                <img src="${infoProducto.images[i]}" class="d-block rounded mx-auto">
            </div>
            `;
        }
        else{
            imagesPrd +=`
            <div class="carousel-item">
                <img src="${infoProducto.images[i]}" class="d-block rounded mx-auto">
            </div>
            `;
        }
    }
    document.getElementById("products_images").innerHTML = imagesPrd;

    document.getElementById("related_products").innerHTML = showRelatedProducts();
}

function showStarsScore(puntos) {
    let starScore = 0;
    let starCheck = `<span class="fa fa-star checked"></span>`;
    let starEmpty = `<span class="fa fa-star"></span>`;
    switch (puntos) {
        case 1: starScore = starCheck + starEmpty.repeat(4);
            break;
        case 2: starScore = starCheck.repeat(2) + starEmpty.repeat(3);
            break;
        case 3: starScore = starCheck.repeat(3) + starEmpty.repeat(2);
            break;
        case 4: starScore = starCheck.repeat(4) + starEmpty;
            break;
        case 5: starScore = starCheck.repeat(5);
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
        relProd +=`
        <div class="col-3">
            <div onclick="setProdID(${infoProducto.relatedProducts[i].id})" class="card cursor-active">
                <img src="${infoProducto.relatedProducts[i].image}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${infoProducto.relatedProducts[i].name}</h5>
                </div>
            </div>
        </div>
        `;
    }
    return relProd;
}


//Funcion para comprar producto
class Comprar{

    constructor(idP, miniatura, nombreP, monedaP, costoP){

        this.idP = idP;
        this.miniatura = miniatura;
        this.nombreP = nombreP;
        this.monedaP = monedaP;
        this.costoP = costoP;
        this.cantP = 1;
    }

    subTotal(){
        return this.cantP * this.costoP;
    }

    set newCant(nuevoCantP){
        this.cantP = nuevoCantP;
        return this.cantP;
    }

}


//Hacer funcion para nuevo comentrario

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
    document.getElementById("btnEnviarComent")?.addEventListener("click", function () {
        let faltaDato = false;
        let newData = document.getElementById("new_coment").value;
        let newScore = parseInt(document.getElementById("score").value);
        let today = new Date();
        let datenow= today.toLocaleString("sv-SE");

        if (newData === "") {
            faltaDato = true;
            alert("Debe escribir un comentario");
        }
        if (newScore >5 || newScore <1) {              
            faltaDato = true;
            alert("Debe elegir una puntuacion");
        }
        if(!faltaDato){
            let newComent = `<li class="list-group-item"><strong>${localStorage.getItem("mailUsuario")}</strong> - ${datenow} - ${showStarsScore(newScore)}<br>
            ${newData}</li>`;
            document.getElementById("product_coments").innerHTML += newComent;
        }
        document.getElementById("new_coment").value="";
        document.getElementById("score").value="0";
    });


    //BOTON COMPRAR
    document.getElementById("boton_comprar").addEventListener("click",function(){
        
        let compraNueva = new Comprar(infoProducto.id, infoProducto.images[0], infoProducto.name, infoProducto.currency, infoProducto.cost);
        console.log(compraNueva);

        let compraNuevaString = JSON.stringify(compraNueva);
        localStorage.setItem("compraNueva", compraNuevaString);

        window.location = "cart.html"

    });

});
