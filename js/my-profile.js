let perfilUsuario = {};

function mostrarDatos(){

    if(localStorage.getItem("perfilUsuario")){

        perfilUsuario= JSON.parse(localStorage.getItem("perfilUsuario"));

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

function guardarDatos(){

    let name = document.getElementById("firstName");
    let name2= document.getElementById("secondName").value;
    let lastName= document.getElementById("lastName");
    let lastName2= document.getElementById("secondLastName").value;
    let mail= document.getElementById("profileEmail");
    let phone= document.getElementById("phoneNumber").value;

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
    }
}

document.addEventListener("DOMContentLoaded", function(){
    verificarLogin();
    mostrarDatos();

    document.getElementById("boton_guardar").addEventListener("click", function(){

        guardarDatos();
    });

});
