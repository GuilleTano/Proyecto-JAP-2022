document.getElementById("loginBtn").addEventListener("click", function(){

    let faltaDato = false;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (email === "") {
        
        faltaDato = true;
        alert("Debe ingresar un mail");

    }
    if (pass === "") {
                
        faltaDato = true;
        alert("Debe ingresar una clave");
    }
    if(!faltaDato){
        alert("Acceso correcto!");
        localStorage.setItem("mailUsuario", email);
        loginRedirection();
    }
}
);

function loginRedirection() {
    window.location.href = "portada.html";
}