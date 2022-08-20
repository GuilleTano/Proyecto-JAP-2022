document.getElementById("loginBtn").addEventListener("click", function(){

    let faltaDato = false;
    let email = document.getElementById("email");
    let pass = document.getElementById("password");

    if (email.value === "") {
        
        faltaDato = true;
        alert("Debe ingresar un mail");

    }
    if (pass.value === "") {
                
        faltaDato = true;
        alert("Debe ingresar una clave");
    }
    if(!faltaDato){
        alert("Acceso correcto!");
        loginRedirection();
    }
}
);

function loginRedirection() {
    window.location.href = "portada.html";
}