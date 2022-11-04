let perfilUsuario = {};

function mostrarDatos(){

    if(localStorage.getItem("perfilUsuario")){
        perfilUsuario= JSON.parse(localStorage.getItem("perfilUsuario"));

        if(localStorage.getItem("mailUsuario") === perfilUsuario.mail){
            document.getElementById("firstName").value = perfilUsuario.name;
            document.getElementById("secondName").value = perfilUsuario.name2;
            document.getElementById("lastName").value = perfilUsuario.lastName;
            document.getElementById("secondLastName").value = perfilUsuario.lastName2;
            document.getElementById("profileEmail").value = perfilUsuario.mail;
            document.getElementById("phoneNumber").value = perfilUsuario.phone;
        }
        else{
            document.getElementById("profileEmail").value = localStorage.getItem("mailUsuario");
        }
    }
    else{
        document.getElementById("profileEmail").value = localStorage.getItem("mailUsuario");
    }
}

function guardarDatos(){

    let name = document.getElementById("firstName");
    let name2= document.getElementById("secondName").value;
    let lastName= document.getElementById("lastName");
    let lastName2= document.getElementById("secondLastName").value;
    let mail= document.getElementById("profileEmail");
    let phone= document.getElementById("phoneNumber").value;
    //let image= document.getElementById("nuevaImagenPefil").value;

    let faltaDato = false;

    if(name.value === ""){
        faltaDato = true;
        name.classList.add("is-invalid");
        name.addEventListener("keyup", function(){
            if(name.value ===""){
                name.classList.remove("is-valid");
                name.classList.add("is-invalid");
            }
            else{
                name.classList.remove("is-invalid");
                name.classList.add("is-valid");
            }
        });
    }
    if(lastName.value ===""){
        faltaDato = true;
        lastName.classList.add("is-invalid");
        lastName.addEventListener("keyup", function(){
            if(lastName.value ===""){
                lastName.classList.remove("is-valid");
                lastName.classList.add("is-invalid");
            }
            else{
                lastName.classList.remove("is-invalid");
                lastName.classList.add("is-valid");
            }
        });
    }
    if(mail.value===""){
        faltaDato = true;
        mail.classList.add("is-invalid");
        mail.addEventListener("keyup", function(){
            if(mail.value ===""){
                mail.classList.remove("is-valid");
                mail.classList.add("is-invalid");
            }
            else{
                mail.classList.remove("is-invalid");
                mail.classList.add("is-valid");
            }
        });
    }
    if(!faltaDato){

        perfilUsuario ={
            name: name.value,
            name2: name2,
            lastName: lastName.value,
            lastName2: lastName2,
            mail: mail.value,
            phone: phone
        };
        localStorage.setItem("perfilUsuario", JSON.stringify(perfilUsuario));

        document.getElementById("cambiosGuardados").innerHTML += `
        <div class="alert alert-success mt-5 alert-dismissible role="alert" style="text-align:center">
        <div>¡Los datos fueron guardados!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
}

//Muestra la imagen al momento de subir el archivo
function readURL(input) {

    let reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('bannerImg').src =  e.target.result;
    }
    reader.readAsDataURL(input.files[0]);

}

//Convertir y guardar la imagen en localStorage
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
function guardarImagen(){

    bannerImage = document.getElementById('bannerImg');
    imgData = getBase64Image(bannerImage);
    localStorage.setItem("imgData", imgData);
}

//Sacar la imagen del localStorage y mostrarla
function mostrarImagen(){

    bannerImg = document.getElementById('bannerImg');

    if(localStorage.getItem('imgData')){
        let dataImage = localStorage.getItem('imgData');
        bannerImg.src = "data:image/png;base64," + dataImage;
        
        bannerImg.style = "width:120px;height:60px;";
    }
    else{
        bannerImg.src = "img/img_perfil.png";
    }
    
}



document.addEventListener("DOMContentLoaded", function(){
    verificarLogin();
    mostrarDatos();

    mostrarImagen();

    document.getElementById("boton_guardar").addEventListener("click", function(){

        guardarDatos();
        guardarImagen();
    });

});
