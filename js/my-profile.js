let saveImage = false;

class Registro {
    constructor(name1, name2, lastName1, lastName2, mail, phone) {
        this.nombre1 = name1;
        this.nombre2 = name2;
        this.apellido1 = lastName1;
        this.apellido2 = lastName2;
        this.correo = mail;
        this.telefono = phone;
    }
}

function guardarDatosPerfil() {

    let name1 = document.getElementById("firstName").value;
    let name2 = document.getElementById("secondName").value;
    let lastName1 = document.getElementById("lastName").value;
    let lastName2 = document.getElementById("secondLastName").value;
    let mail = document.getElementById("profileEmail").value;
    let phone = document.getElementById("phoneNumber").value;
    let faltaDato = false;

    if(name1 === ""){
        faltaDato = true;
        name1.classList.add("is-invalid");
        name1.addEventListener("keyup", function(){
            if(name1.value ===""){
                name1.classList.remove("is-valid");
                name1.classList.add("is-invalid");
            }
            else{
                name1.classList.remove("is-invalid");
                name1.classList.add("is-valid");
            }
        });
    }
    if(lastName1 ===""){
        faltaDato = true;
        lastName1.classList.add("is-invalid");
        lastName1.addEventListener("keyup", function(){
            if(lastName1.value ===""){
                lastName1.classList.remove("is-valid");
                lastName1.classList.add("is-invalid");
            }
            else{
                lastName1.classList.remove("is-invalid");
                lastName1.classList.add("is-valid");
            }
        });
    }
    if(mail ===""){
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
    if (!faltaDato) {

        let perfil = new Registro(name1, name2, lastName1, lastName2, mail, phone);

        if(saveImage){
            let profileImage = document.getElementById('profileImg');
            imgData = getBase64Image(profileImage);
            perfil.imagen = imgData;
        }

        if(localStorage.getItem("listaPerfiles")){
            listaPerfiles = JSON.parse(localStorage.getItem("listaPerfiles"));
            listaPerfiles.push(perfil);
            localStorage.setItem("listaPerfiles", JSON.stringify(listaPerfiles));
        }
        else{
            let listaPerfiles = [];
            listaPerfiles.push(perfil);
            localStorage.setItem("listaPerfiles", JSON.stringify(listaPerfiles));
        }

        document.getElementById("cambiosGuardados").innerHTML += `
        <div class="alert alert-success mt-5 alert-dismissible" role="alert" style="text-align:center">
        <div>¡Los datos fueron guardados!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
}

function mostrarDatosPerfil(){

    if(localStorage.getItem("listaPerfiles")){
        listaPerfiles= JSON.parse(localStorage.getItem("listaPerfiles"));

        let profileImg = document.getElementById('profileImg');

        for(i=0; i < listaPerfiles.length; i++){

            if(localStorage.getItem("mailUsuario") === listaPerfiles[i].correo){
                document.getElementById("firstName").value = listaPerfiles[i].nombre1;
                document.getElementById("secondName").value = listaPerfiles[i].nombre2;
                document.getElementById("lastName").value = listaPerfiles[i].apellido1;
                document.getElementById("secondLastName").value = listaPerfiles[i].apellido2;
                document.getElementById("profileEmail").value = listaPerfiles[i].correo;
                document.getElementById("phoneNumber").value = listaPerfiles[i].telefono;
                
                if(listaPerfiles[i].imagen){
                    profileImg.src = "data:image/png;base64," + listaPerfiles[i].imagen;
                }
                else{
                    profileImg.src = "img/img_perfil.png";
                }
            }
            else{
                document.getElementById("profileEmail").value = localStorage.getItem("mailUsuario");
            }
        }
    }
    else{
        document.getElementById("profileEmail").value = localStorage.getItem("mailUsuario");
    }
}

//Muestra la imagen al momento de subir el archivo
function imagePreview(input) {

    let reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('profileImg').src =  e.target.result;
    }
    reader.readAsDataURL(input.files[0]);

    return saveImage = true;
}

//Convertir la imagen para poder guardarla
function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    let contexto = canvas.getContext("2d");
    contexto.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

document.addEventListener("DOMContentLoaded", function(){
    verificarLogin();
    mostrarDatosPerfil();

    document.getElementById("boton_guardar").addEventListener("click", function(){
        guardarDatosPerfil();
    });
});
